const mongoose = require('mongoose');

/**
 * API để tải file .mbtiles từ GridFS (streaming trực tiếp)
 * @param {Object} req - HTTP request
 * @param {Object} res - HTTP response
 */
const downloadMbtiles = async (req, res) => {
    const conn = mongoose.connection;

    // Kiểm tra trạng thái kết nối MongoDB
    if (conn.readyState !== 1) {
        console.error("MongoDB chưa được kết nối");
        return res.status(500).json({ error: 'MongoDB chưa được kết nối' });
    }

    const bucket = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: 'maps' // Tên bucket của bạn
    });

    const filename = 'crop_area.mbtiles'; // Tên file cần tải

    try {
        // Kiểm tra file trong GridFS
        const file = await conn.db.collection('maps.files').findOne({ filename });
        if (!file) {
            console.error(`File ${filename} không tồn tại trong GridFS`);
            return res.status(404).json({ error: 'File không tồn tại' });
        }

        // Cấu hình header cho response
        res.set({
            'Content-Type': 'application/octet-stream',
            'Content-Disposition': `attachment; filename="${filename}"`,
        });

        // Tạo stream từ GridFS và pipe trực tiếp đến response
        const readstream = bucket.openDownloadStreamByName(filename);

        // Truyền dữ liệu qua stream
        readstream.pipe(res);

        // Xử lý lỗi trong stream
        readstream.on('error', (err) => {
            console.error(`Lỗi khi đọc file từ GridFS: ${err.message}`);
            res.status(500).json({ error: 'Lỗi khi tải file' });
        });

        // Khi stream kết thúc
        readstream.on('end', () => {
            console.log(`Tải file ${filename} thành công`);
        });

    } catch (error) {
        console.error(`Lỗi trong quá trình xử lý: ${error.message}`);
        res.status(500).json({ error: 'Có lỗi xảy ra trong quá trình tải file' });
    }
};

module.exports = { downloadMbtiles };
