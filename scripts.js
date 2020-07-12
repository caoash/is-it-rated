var nextContest, blog;

function grabContest() {

  fetch("https://codeforces.com/api/contest.list")
    .then ((response) => {
      return response.json();
    })
    .then((data) => {
        var contestList = data.result;
        var res;
        if(contestList.length == 0){
          res = "No Upcoming Contests";
        }
        else{
          res = contestList[0].name;
        }
        nextContest = res;
        grabCF()
    })
    .catch((err) => {
    })
}

function grabCF() {
  fetch("https://codeforces.com/api/recentActions?maxCount=100")
    .then ((response) => {
      return response.json();
    })
    .then((data) => {
      var num = Math.floor((Math.random() * 100));
      var entry = data.result[num].blogEntry;
      var title = entry.title;
      while(entry.rating < 0 || entry.length > 70){
        console.log(title.length)
        console.log(title)
        num = Math.floor((Math.random() * 100));
      }
      blog = title.substring(3, title.length - 4)
      run(nextContest, blog)
    })
    .catch((err) => {
    })
}

function run(nextContest, blog){
  const main = document.getElementById('main-text')
  const topContainer = document.getElementById('container')

  const intro = document.createElement('h2')
  const contest = document.createElement('h1')
  const second = document.createElement('h2')
  const rated = document.createElement('h1')
  const third = document.createElement('h2')
  const reason = document.createElement('h1')
  var isItRated = (Math.floor(Math.random() * 2));

  intro.textContent = "Codeforces Round"
  contest.textContent = nextContest
  second.textContent = "will " + (isItRated ? "fortunately " : "unfortunately ") + "be"
  rated.textContent = (isItRated ? "Rated" : "Unrated");
  third.textContent = "due to"
  reason.textContent = blog  

  intro.setAttribute('class', 'static-text')
  second.setAttribute('class', 'static-text')
  third.setAttribute('class', 'static-text')

  contest.setAttribute('class', 'dynamic-text')
  reason.setAttribute('class', 'dynamic-text')    
  rated.setAttribute('class', 'dynamic-text')      

  topContainer.style.marginTop = "60px"
  intro.style.fontSize = "60px"
  contest.style.fontSize = "70px"
  second.style.fontSize = "60px"
  reason.style.fontSize = "70px"
  third.style.fontSize = "60px"
  rated.style.fontSize = "70px"

  main.appendChild(intro)
  main.appendChild(contest)
  main.appendChild(second)
  main.appendChild(rated)
  main.appendChild(third)
  main.appendChild(reason)
}

grabContest()
