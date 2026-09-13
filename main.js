import { renderApp } from './app.js';
import './styles/tokens.css';
import './styles/app.css';

renderApp();

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch(() => {});
  });
}
