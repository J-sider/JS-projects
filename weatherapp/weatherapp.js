window.addEventListener("load", () => {
  let long;
  let lat;
  let tempDescription = document.querySelector(".temp-description");
  let tempDegree = document.querySelector(".temp-degree");
  let locationTimezone = document.querySelector(".location-timezone");
  let tempSection = document.querySelector(".degree-section");
  const tempSpan = document.querySelector(".degree-section span");
  var body = document.querySelector("body");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position);
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const api = `https://api.weatherapi.com/v1/current.json?key=7002518d379c4a9c8cb181353230503&q=${lat}, ${long}&aqi=no`;

      fetch(api)
        .then((data) => {
          return data.json();
        })
        .then((data) => {
          console.log(data);
          const { temp_c, temp_f, condition } = data.current;
          //   set DOM elements from API
          tempDegree.textContent = temp_f;
          tempDescription.textContent = condition.text;
          locationTimezone.textContent = data.location.name;

          //   formula for Celcius
          //   let celcius = (tempDegree - 32) * (5 / 9);

          //   icon
          //   var icon = condition.icon;
          //   //   console.log(icon);
          //   setIcons(icon, document.querySelector(".icon"));

          //   change background color
          let tempFar = data.current.temp_f;

          if (tempFar > 80) {
            document.body.style.background =
              "linear-gradient(rgb(219, 209, 117), rgb(148, 65, 5))";
          }

          // nightime vibe
          let now = new Date();
          let currentTime = now.toLocaleTimeString("it-IT");
          console.log(currentTime);

          if (currentTime > "18:00:00") {
            document.body.style.background =
              "linear-gradient(rgb(0, 0, 0), rgb(48, 62, 143))";
          }

          //change temp to C
          tempSection.addEventListener("click", () => {
            if (tempSpan.textContent === "F") {
              tempSpan.textContent = "C";
              tempDegree.textContent = temp_c;
            } else {
              tempSpan.textContent = "F";
              tempDegree.textContent = temp_f;
            }
          });
        });
    });
  } else {
    h1.textContent = "please allow location services for app to function";
  }
});
