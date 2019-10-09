'use strict';

// Styles
import './assets/styles/styles.css';

// Icons
import starIcon from './assets/images/star.png';
import forkIcon from './assets/images/fork.png';

import gitHub from './Api.js';

const searchButton = document.querySelector('button');
const $error = document.getElementsByClassName('error');
const $container_profile = document.getElementsByClassName('container');
const $repos__list = document.getElementsByClassName('repos__list');

const showNotExists = (isError) => {
  if (isError) {
    if (!$container_profile[0].classList.contains('container_hide')) {
      $container_profile[0].classList.add('container_hide');
    }
    $error[0].classList.remove('error_hide');
  } else {
    if (!$error[0].classList.contains('error_hide')) {
      $error[0].classList.add('error_hide');
    }
    $container_profile[0].classList.remove('container_hide');
  }
}

const showPerfilUser = (data) => {
  const { login, name, bio, avatar_url } = data;

  // Get Container profile
  let imageProfile = document.getElementsByClassName('container__profile--image');
  let loginProfile = document.getElementsByClassName('profile-details__user');
  let nameProfile = document.getElementsByClassName('profile-details__name');
  let bioProfile = document.getElementsByClassName('profile-details__biography');

  imageProfile[0].src = avatar_url;
  loginProfile[0].innerHTML = `@${login}`;
  nameProfile[0].innerHTML = name;
  bioProfile[0].innerHTML = bio;
}

const showRepos = (data) => {
  $repos__list[0].innerHTML = "";
  data.forEach((item) => {
    const { name, stargazers_count, forks_count } = item;
    let templateRepo = `<li><div class="repo__item">
                          <h3>${name}</h3>
                          <div class="repo__item-details">
                            <img src="${starIcon}" class="star-image" alt="star">
                            <p>${stargazers_count}</p>
                            <img src="${forkIcon}" class="fork-image" alt="fork">
                              <p>${forks_count}</p>
                          </div>
                        </div></li>`;
    templateRepo = new DOMParser().parseFromString(templateRepo, 'text/html');
    $repos__list[0].append(templateRepo.body.firstChild);
  });
}

searchButton.onclick = async (event) => {
  // Get input value
  const searchInput = document.querySelector('input').value;
  if (searchInput !== "") {
    // Get User
    const _gitHub = new gitHub(searchInput);
    const user = await _gitHub.getUserByUserName();
    // user.then(data => showRepos(data));
    // Validate if user exist
    if (typeof user.message !== "undefined") {
      showNotExists(true);
    } else {
      showNotExists(false);
      showPerfilUser(user);
      // Get Repos
      const repos = await _gitHub.getReposByUserName();
      showRepos(repos);
    }
  }
};