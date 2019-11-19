import dva from 'dva';
import './index.css';

// 1. Initialize
const app = dva();

// 2. Plugins
// app.use({});

// 3. Model
app.model(require('./models/recommend').default);
app.model(require('./models/searchModel').default);
app.model(require('./models/radioModel').default);
app.model(require('./models/playlist').default);
app.model(require("./models/commentPlaylist").default);
app.model(require('./models/playlistInfo').default);
app.model(require('./models/catelist').default);
app.model(require("./models/djs").default);
app.model(require('./models/djDetails').default);
app.model(require('./models/djPrograms').default);

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');

