import { createBrowserRouter } from 'react-router';
import Root from './layouts/Root';
import Home from './pages/Home';
import Archive from './pages/Archive';
import Post from './pages/Post';
import About from './pages/About';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: 'archive', Component: Archive },
      { path: 'post/:slug', Component: Post },
      { path: 'about', Component: About },
      { path: 'contact', Component: Contact },
      { path: '*', Component: NotFound },
    ],
  },
]);
