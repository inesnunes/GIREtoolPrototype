import React from 'react'

const Header = () => {
  return (
    <header>
      <div className="intro-logo jumbo-bg">
        <h1>GIRE Tool</h1>
        <h3>A Support Tool for the Gender Inclusive Requirements Elicitation Framework</h3>
        <div className="intro-button">
          <a href="">What is this tool?</a>
        </div>
        <div className="intro-button">
          <a href="">See Instructions</a>
        </div>
        <div className="intro-button">
          <a href="/workspace">Go to Workspace</a>
        </div>
        </div>

      <style jsx>{`
        header {
          height: 40vh;
        }

        .intro-logo {
          display: flex;
          position: absolute;
          top: 4em;
          bottom: 0;
          left: 0;
          right: 0;
          flex-direction: column;
          justify-content: flex start;
          align-items: center;
          text-align: center;
          background-image: url(./exp.png);
          background-position: center center;
          background-size: cover;
          background-repeat: no-repeat;
          background-attachment: fixed;
        }

        .intro-logo h1 {
            margin-top: 3.0em;
          font-size: 5em;
          font-weight: 500;
          font-family: 'Calibri Light', sans-serif;
          color: white;
        }

        .intro-logo h3 {
          font-size: 1.5rem;
          font-weight: 300;
          color: white;
          margin-bottom: 3em;
        }

        @media (min-width: 768px) {
          .intro-logo h1 {
            font-size: 3.5em;
          }
        }
        .intro-logo img {
          max-width: 95%;
          height: auto;
        }
        .intro-button {
          margin-top: 1em;
          margin-bottom: 1em;
        }
        .intro-button a {
          padding: 0.65em 2.6em;
          border-radius: 20px;
          color: var(--brand-color);
          border: 1.8px solid var(--brand-color);
          background: white;
          transition: all 0.5s;
        }
        .intro-button a:hover {
          background-color: var(--brand-color);
          color: white;
        }
      `}</style>
    </header>
  )
}

export default Header
