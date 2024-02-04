import express from 'express';
import chokidar from 'chokidar';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const hlsWatchDir = '/tmp/hls/live';
const watcher = chokidar.watch(hlsWatchDir, { ignored: /^\./, persistent: true });

watcher.on('add', path => {
    console.log(`File ${path} has been added`);
    // After the segments are added, we can upload to a cloud storage or something
    // also we can delete the segments after uploading to save space
});

app.post('/validate-key', (req, res) => {
    console.log('Validating key...');
    const streamKey = req.body.name;
    if (streamKey == 'keytest') {
        return res.status(200).json({ message: 'Key is valid' });
    }
    return res.status(400).json({ message: 'Key is invalid' });
});


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});