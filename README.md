## 💬 About

### Backend developed for GoBarber application :barber:

The main purpose of this backend is to handle, for now things like:<br>

<ul>
<li>User creation, update and authentication;</li>
<li>Appointments</li>
</ul>

## :hammer_and_wrench: Development Tools Used

<div style="display: flex; flex-direction: row; justify-content: space-around;">

  <div style="display: flex; flex-direction: column">
  <img src="./readme_assets/nodejs-brands.svg" />
  <p>Node.js</p>
  </div>

  <div style="display: flex; flex-direction: column">
  <img src="./readme_assets/typescript-brands.svg" />
  <p>Typescript</p>
  </div>

  <div style="display: flex; flex-direction: column">
  <img src="./readme_assets/docker-brands.svg" />
  <p>Docker</p>
  </div>
</div>
<p><b>Node.js</b> environment to manage application settings;</p>
<p><b>Typescript</b> usage for better comprehension of the code;</p>
<p><b>Docker</b> environment to simulate a remote database;</p>

## :computer: How to use

<ol>
<li>Clone this repository to your machine;</li>
<li>Install dependencies using `yarn`
</li>
<li>Maybe it will be necessary to setup and configure some docker container. If you have other place to store your data, remember to modify `ormconfig.json` file</li>
<li>To start the devolpment server, execute on a terminal the following:
`yarn dev:server`
</li>
</ol>
