const mongoose = require('mongoose');
const fs = require('fs');

const downloadMbtiles = (req, res) => {
    const conn = mongoose.connection;

    if (conn.readyState !== 1) { // Kiểm tra xem kết nối có đang mở không
        return res.status(500).json({ err: 'MongoDB chưa được kết nối' });
    }

    // Use Mongoose's GridFSBucket
    const bucket = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: 'maps' // Set the bucket name to 'maps'
    });

    const filename = 'crop_area.mbtiles';
    const fs_write_stream = fs.createWriteStream(filename);

    // Create a read stream from the GridFS bucket
    const readstream = bucket.openDownloadStreamByName(filename);
    
    readstream.pipe(fs_write_stream);

    // Listen for the end of the stream and send the file as a download response
    fs_write_stream.on('finish', () => {
        res.download(filename, (err) => {
            if (err) {
                console.error("Error downloading file:", err);
                res.status(500).json({ err: 'File download failed' });
            } else {
                console.log("File downloaded successfully");
            }
        });
    });

    fs_write_stream.on('error', (err) => {
        console.error("Error writing file:", err);
        res.status(500).json({ err: 'File write failed' });
    });
};

module.exports = { downloadMbtiles };
