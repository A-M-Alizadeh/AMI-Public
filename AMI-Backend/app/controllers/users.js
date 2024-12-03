const { getMessaging } = require('firebase-admin/messaging');
const db = require('../boot/firestore')
const messaging = require('../boot/firestore')
const moment = require('moment')
const PDFDocument = require('pdfkit')


exports.usersList = async (req, res, next) => {

    try {

        let users = [];

        const usersCollection = await db.collection('Users')
            .get();

        usersCollection.docs.map(doc => {
            users.push(doc.data())
        })

        return res.send({ data: users })

    } catch (error) {
        next(error);
    }

}

exports.userById = async (req, res, next) => {
    try {

        const { username } = req.params;
        let user;

        const usersCollection = await db.collection('Users')
            .where('username', "==", username).get();

        usersCollection.docs.map(doc => {
            user = doc.data()
        });

        return res.send({ user })


    } catch (error) {
        next(error);
    }
}

exports.userStats = async (req, res, next) => {

    try {

        const { username } = req.params;


        const totalRecords = await db.collection('records')
            .where('username', "==", username)
            .orderBy('date', 'desc')
            .select('feeling', 'sleepEnd', 'sleepStart')
            .get()

        if (totalRecords.empty) {
            return res.status(404).send({ message: 'not found!' })
        }

        const lastWeekRecords = await db.collection('records')
            .where('username', "==", username)
            .orderBy('date', 'desc')
            .select('feeling', 'sleepEnd', 'sleepStart')
            .limit(7)
            .get();


        const lastMonthRecords = await db.collection('records')
            .where('username', "==", username)
            .orderBy('date', 'desc')
            .select('feeling', 'sleepEnd', 'sleepStart')
            .limit(30)
            .get();


        return res.send({
            week: generateStat(lastWeekRecords),
            month: generateStat(lastMonthRecords),
            total: generateStat(totalRecords)
        })

    } catch (error) {
        next(error);
    }

}

exports.userActivities = async (req, res, next) => {

    try {

        const { username } = req.params;

        let foodIds = []

        const records = await db.collection('records')
            .where('username', "==", username)
            .orderBy('date', 'desc')
            .select('foodIds')
            .get()

        if (records.empty) {
            return res.status(404).send({ message: 'not found!' })
        }

        records.docs.map(doc => {
            const len = doc.data()['foodIds'].length;

            for (let i = 0; i < len; i++)
                foodIds.push(doc.data()['foodIds'][i])
        });

        return res.send({
            foodIds: calElementFrequencies(foodIds)
        });


    } catch (error) {
        next(error)
    }

}

function getSleepDuration(start, end) {
    return Math.abs(end.split(':')[0] - start.split(':')[0])
}

function generateStat(records) {

    const len = records.docs.length
    const moods = []
    const sleepDurations = []
    let totalMood = 0
    let totalSleep = 0

    records.docs.map(doc => {
        const mood = doc.data().feeling * 10;
        const sleepDuration = getSleepDuration(doc.data().sleepEnd, doc.data().sleepStart) - 5;
        moods.push(mood);
        sleepDurations.push(sleepDuration);
        totalMood += mood;
        totalSleep += sleepDuration;
    });

    return {
        moods,
        moodAvg: parseFloat((totalMood / len).toFixed(2)),
        detail: calElementFrequencies(moods),
        sleepDurations,
        sleepAvg: parseFloat((totalSleep / len).toFixed(2))
    }

}

exports.sendNotif = async(req, res, next) => {
    try{
        reqBody = req.body;
        let user;
        const usersCollection = await db.collection('Users')
            .where('username', "==", reqBody.username).get();
    
        usersCollection.docs.map(doc => {user = doc.data()});
        // console.log(user)
        // console.log(user.fcmToken)
        // token = user.fcmToken;
        token = user?.fcmToken?._j;
        if (!token)
            token = user?.fcmToken;
        if (!token)
            return res.send({ code: 400, message: 'User has no token!' })
    
    
        const message = {
            notification: {
              title: reqBody.title,
              body: reqBody.message,
            },
            token: token,
          };
    
        getMessaging().send(message).then((response) => {
            console.log('Successfully sent message:', response);
          })
          .then(() => {
            res.send({ code:200, message: 'Notification sent!' })
          })
          .catch((error) => {
            console.log('Error sending message:', error);
            res.send({ code: 400, message: error.message})
          })
    }catch(error) {
        next(error)
    }
    
}


exports.generateReport = async (req, res, next) => {
    try {
        const { patientUsername, doctorUsername } = req.body;

        const records = await db.collection('records')
            .where('username', "==", patientUsername)
            .orderBy('date', 'desc')
            .select('feeling', 'sleepEnd', 'sleepStart', 'foodIds')
            .get()

        if (records.empty) {
            return res.status(404).send({ message: 'not found!' })
        }

        const doc = new PDFDocument();
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename="generated.pdf"');

        doc.pipe(res);

        doc.fontSize(25).text(`AMI Report`, { align: 'center' });
        doc.moveDown();

        doc.fontSize(20).text(`Doctor: ${doctorUsername}`, { align: 'center' });
        doc.fontSize(20).text(`Patient: ${patientUsername}`, { align: 'center' });


        doc.fontSize(20).text('Mood Stats', { align: 'center' });

        const stats = generateStat(records);

        doc.moveDown();

        doc.fontSize(15).text('Mood Average: ' + stats.moodAvg, {
            align: 'center'
        });

        doc.fontSize(15).text('Mood Details: ', { align: 'center' });

        for (const key in stats.detail) {
            doc.fontSize(10).text(key + ': ' + stats.detail[key]);
        }

        doc.moveDown();

        doc.fontSize(20).text('Sleep Stats', { align: 'center' });


        doc.fontSize(15).text('Sleep Average: ' + stats.sleepAvg, {
            align: 'center'
        });

        doc.moveDown();

        doc.fontSize(15).text('Sleep Details: ', { align: 'center' });

        for (const key in stats.sleepDurations) {
            doc.moveDown();
            doc.fontSize(10).text(key + ': ' + stats.sleepDurations[key]);
        }

        doc.moveDown();

        doc.fontSize(20).text('Food Stats', { align: 'center' });

        let foodIds = []

        records.docs.map(doc => {
            const len = doc.data()['foodIds'].length;
            for (let i = 0; i < len; i++)
                foodIds.push(doc.data()['foodIds'][i])
        });

        const foodStats = calElementFrequencies(foodIds);

        doc.fontSize(15).text('Food Details: ', { align: 'center' });

        for (const key in foodStats) {
            doc.moveDown();
            doc.fontSize(10).text(key + ': ' + foodStats[key]);
        }

        doc.moveDown();

        doc.fontSize(20).text('Tickets', { align: 'center' });


        let tickets = await db.collection('Tickets')
            .where('senderUsername', '==', patientUsername)
            .where('receiverUsername', '==', doctorUsername)
            .get()

        tickets.docs.map(tickt => {
            doc.moveDown();
            doc.fontSize(10).text('Title: ' + tickt.data().title);
            doc.fontSize(10).text('Message: ' + tickt.data().description);
            doc.fontSize(10).text('Answer: ' + tickt.data().answer);
            doc.fontSize(10).text('-'.repeat(10));
        })

        doc.end();

    } catch (error) {
        next(error)
    }
}

exports.uploadImage = async (req, res, next) => {
    try {
        const { username } = req.params;
        const { imageUrl } = req.body;
    } catch (error) {
        next(error)
    }
}


exports.userAchievements = async (req, res, next) => {

    try {

        let activities = []
        const { username } = req.params

        const records = await db.collection('records')
            .where('username', "==", username)
            .orderBy('date', 'desc')
            .select('activityIds')
            .get()

        if (records.empty) {
            return res.status(404).send({ message: 'not found!' })
        }

        records.docs.map(doc => {
            const len = doc.data()['activityIds'].length;

            for (let i = 0; i < len; i++)
                activities.push(doc.data()['activityIds'][i])
        });


        const frequneciees = calElementFrequencies(activities)

        const workout = {
            lvl1: {
                count: 7,
                xp: 5
            },
            lvl2: {
                count: 30,
                xp: 32
            },
            lvl3: {
                count: 90,
                xp: 120
            },
            total: frequneciees['4']
        }

        const running = {
            lvl1: {
                count: 7,
                xp: 5
            },
            lvl2: {
                count: 30,
                xp: 32
            },
            lvl3: {
                count: 90,
                xp: 120
            },
            total: frequneciees['3']
        }

        const walking = {
            lvl1: {
                count: 7,
                xp: 5
            },
            lvl2: {
                count: 30,
                xp: 32
            },
            lvl3: {
                count: 90,
                xp: 120
            },
            total: frequneciees['2']
        }

        return res.send({
            workout,
            walking,
            running
        })

    } catch (error) {
        next(error)
    }

}

function calElementFrequencies(array) {

    frequency = {};

    for (var i = 0; i < array.length; ++i) {
        if (!frequency[array[i]])
            frequency[array[i]] = 0;
        ++frequency[array[i]];
    }

    return frequency

}


