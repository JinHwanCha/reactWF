const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs').promises;
const ftp = require('basic-ftp');
const session = require('express-session');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// FTP 설정
const FTP_CONFIG = {
    host: '112.175.185.145',
    user: 'fisherman',
    password: 'ns7076351!',
    secure: false
};

// 관리자 계정
const ADMIN_CREDENTIALS = {
    username: 'fisherman',
    password: 'ns7076351!'
};

// 미들웨어
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'fisherman-secret-key-2026',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 24 * 60 * 60 * 1000 } // 24시간
}));

// 정적 파일 서빙
app.use(express.static(__dirname));

// 이미지 업로드 설정
const storage = multer.diskStorage({
    destination: async (req, file, cb) => {
        const uploadDir = path.join(__dirname, 'images', 'uploads');
        try {
            await fs.mkdir(uploadDir, { recursive: true });
        } catch (error) {
            console.error('Error creating upload directory:', error);
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ 
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
    fileFilter: (req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png|gif|webp/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);
        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb(new Error('이미지 파일만 업로드 가능합니다!'));
        }
    }
});

// 인증 미들웨어
function isAuthenticated(req, res, next) {
    if (req.session.isAuthenticated) {
        next();
    } else {
        res.status(401).json({ error: '인증이 필요합니다.' });
    }
}

// 로그인
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
        req.session.isAuthenticated = true;
        req.session.username = username;
        res.json({ success: true, message: '로그인 성공!' });
    } else {
        res.status(401).json({ success: false, message: '아이디 또는 비밀번호가 잘못되었습니다.' });
    }
});

// 로그아웃
app.post('/api/logout', (req, res) => {
    req.session.destroy();
    res.json({ success: true, message: '로그아웃 되었습니다.' });
});

// 인증 상태 확인
app.get('/api/check-auth', (req, res) => {
    res.json({ isAuthenticated: !!req.session.isAuthenticated });
});

// 데이터 파일 읽기
async function readDataFile(filename) {
    const filePath = path.join(__dirname, 'data', filename);
    try {
        const data = await fs.readFile(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}

// 데이터 파일 쓰기
async function writeDataFile(filename, data) {
    const dataDir = path.join(__dirname, 'data');
    await fs.mkdir(dataDir, { recursive: true });
    const filePath = path.join(dataDir, filename);
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
}

// FTP 업로드
async function uploadToFTP(localPath, remotePath) {
    const client = new ftp.Client();
    client.ftp.verbose = true;
    
    try {
        await client.access(FTP_CONFIG);
        await client.uploadFrom(localPath, remotePath);
        console.log(`✓ FTP 업로드 성공: ${remotePath}`);
        return true;
    } catch (error) {
        console.error(`✗ FTP 업로드 실패: ${error.message}`);
        return false;
    } finally {
        client.close();
    }
}

// 이미지 업로드
app.post('/api/upload-image', isAuthenticated, upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: '파일이 업로드되지 않았습니다.' });
        }
        
        const localPath = req.file.path;
        const relativePath = path.relative(__dirname, localPath).replace(/\\/g, '/');
        const remotePath = '/html/' + relativePath;
        
        // FTP 업로드 (비동기로 처리)
        uploadToFTP(localPath, remotePath).catch(err => {
            console.error('FTP 업로드 에러:', err);
        });
        
        res.json({
            success: true,
            filename: req.file.filename,
            path: '/' + relativePath,
            url: relativePath
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Work 데이터 가져오기
app.get('/api/work', isAuthenticated, async (req, res) => {
    const data = await readDataFile('work.json');
    res.json(data);
});

// Work 데이터 저장
app.post('/api/work', isAuthenticated, async (req, res) => {
    try {
        const data = await readDataFile('work.json');
        const newItem = {
            id: Date.now(),
            ...req.body,
            createdAt: new Date().toISOString()
        };
        data.push(newItem);
        await writeDataFile('work.json', data);
        
        // FTP 업로드
        const localPath = path.join(__dirname, 'data', 'work.json');
        const remotePath = '/html/data/work.json';
        await uploadToFTP(localPath, remotePath);
        
        res.json({ success: true, data: newItem });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Work 데이터 삭제
app.delete('/api/work/:id', isAuthenticated, async (req, res) => {
    try {
        const data = await readDataFile('work.json');
        const filteredData = data.filter(item => item.id !== parseInt(req.params.id));
        await writeDataFile('work.json', filteredData);
        
        const localPath = path.join(__dirname, 'data', 'work.json');
        const remotePath = '/html/data/work.json';
        await uploadToFTP(localPath, remotePath);
        
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// News 데이터 가져오기
app.get('/api/news', isAuthenticated, async (req, res) => {
    const data = await readDataFile('news.json');
    res.json(data);
});

// News 데이터 저장
app.post('/api/news', isAuthenticated, async (req, res) => {
    try {
        const data = await readDataFile('news.json');
        const newItem = {
            id: Date.now(),
            ...req.body,
            createdAt: new Date().toISOString()
        };
        data.push(newItem);
        await writeDataFile('news.json', data);
        
        const localPath = path.join(__dirname, 'data', 'news.json');
        const remotePath = '/html/data/news.json';
        await uploadToFTP(localPath, remotePath);
        
        res.json({ success: true, data: newItem });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// News 데이터 삭제
app.delete('/api/news/:id', isAuthenticated, async (req, res) => {
    try {
        const data = await readDataFile('news.json');
        const filteredData = data.filter(item => item.id !== parseInt(req.params.id));
        await writeDataFile('news.json', filteredData);
        
        const localPath = path.join(__dirname, 'data', 'news.json');
        const remotePath = '/html/data/news.json';
        await uploadToFTP(localPath, remotePath);
        
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// People 데이터 가져오기
app.get('/api/people', isAuthenticated, async (req, res) => {
    const data = await readDataFile('people.json');
    res.json(data);
});

// People 데이터 저장
app.post('/api/people', isAuthenticated, async (req, res) => {
    try {
        const data = await readDataFile('people.json');
        const newItem = {
            id: Date.now(),
            ...req.body,
            createdAt: new Date().toISOString()
        };
        data.push(newItem);
        await writeDataFile('people.json', data);
        
        const localPath = path.join(__dirname, 'data', 'people.json');
        const remotePath = '/html/data/people.json';
        await uploadToFTP(localPath, remotePath);
        
        res.json({ success: true, data: newItem });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// People 데이터 삭제
app.delete('/api/people/:id', isAuthenticated, async (req, res) => {
    try {
        const data = await readDataFile('people.json');
        const filteredData = data.filter(item => item.id !== parseInt(req.params.id));
        await writeDataFile('people.json', filteredData);
        
        const localPath = path.join(__dirname, 'data', 'people.json');
        const remotePath = '/html/data/people.json';
        await uploadToFTP(localPath, remotePath);
        
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 서버 시작
app.listen(PORT, () => {
    console.log(`
╔════════════════════════════════════════════╗
║   🐟 Fisherman 관리자 서버 실행 중        ║
║   http://localhost:${PORT}                  ║
║   관리자 페이지: http://localhost:${PORT}/admin  ║
╚════════════════════════════════════════════╝
    `);
});
