'use strict';

function gitHub(username) {
  this.username = username;
  this.API = 'https://api.github.com/';
}

gitHub.prototype.getUserByUserName = async function () {
  const response = await fetch(`${this.API}users/${this.username}`);
  const user = await response.json();
  return user;
}

gitHub.prototype.getReposByUserName = async function () {
  const response = await fetch(`${this.API}users/${this.username}/repos`);
  const repos = await response.json();
  return repos;
}

export default gitHub;