import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Tout Compte Fait</title>
        <link rel="icon" href="/wallet.ico" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css" />
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.1/css/all.css" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>
  
        <div className={styles.grid}>
          
            
              <h3>findOneUser</h3>
           
          
           
            
          
        </div>
      </main>


      <footer className={styles.footer}>
    
      </footer>
    </div>
  )
}
