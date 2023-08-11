/* root page */
import './globals.css';
import { Inter } from 'next/font/google';


const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Quiet Quest',
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
      {/*<link rel="apple-touch-icon" sizes="180x180" href="./favicons/apple-touch-icon.png" />*/}
      {/*  <link rel="icon" type="image/png" sizes="32x32" href="static/favicons/favicon-32x32.png" />*/}
      {/*  <link rel="icon" type="image/png" sizes="16x16" href="static/favicons/favicon-16x16.png" />*/}
      {/*  <link rel="manifest" href="static/favicons/site.webmanifest" />*/}
      {/*  <link rel="mask-icon" href="static/favicons/safari-pinned-tab.svg" color="#5bbad5" />*/}
          <link rel="icon" type="image/x-icon" href="/static/favicon.ico" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#000000" />

        </head>
      <body className={inter.className}>
        {children}
        </body>
    </html>
  )
}



