// const newUser = {
//   name: "Maria",
//   job: "Teacher",
// };

// fetch("https://reqres.in/api/users", {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   body: JSON.stringify(newUser),
// })
//   .then((res) => res.json())
//   .then((data) => {
//     console.log(data);
//   });

// fetch("https://reqres.in/api/users/", {
//   method: "GET",
// })
//   .then((res) => res.json())
//   .then((data) => {
//     console.log(data);
//   });

var teams = [];
fetch("https://fantasy.premierleague.com/api/bootstrap-static")
  .then((res) => res.json())
  .then((data) => {
    const incoming = data.teams;
    // console.log(incoming);
    incoming.forEach((x) =>
      teams.push({ name: x.name, id: x.id, short_name: x.short_name })
    );
    // console.log(teams);
    // teams.forEach((t) => console.log(t));
  })
  .catch((error) => console.log(error));

const fetchFixtures = async () => {
  const res = await fetch(
    "https://fantasy.premierleague.com/api/fixtures?event=1"
  );
  const data = await res.json();
  data.forEach((x) => {
    let home = teams.filter((t) => t.id === x.team_h);
    let away = teams.filter((t) => t.id === x.team_a);
    console.log(home);
    const markup = `<li>${home[0].name} ${x.team_h_score} : ${x.team_a_score} ${away[0].name}</li>`;
    document.querySelector("ul").insertAdjacentHTML("beforeend", markup);
  });
};

fetchFixtures();
