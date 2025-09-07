import { app, BrowserWindow, screen } from 'electron';

app.whenReady().then(() => {
  const size = screen.getPrimaryDisplay().size;
  const win = new BrowserWindow({
    width: size.width / 2,
    height: size.height / 2
  });
  win.loadFile('index.html');
});