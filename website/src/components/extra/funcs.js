export function addCommas(num) {
  if (num == "N.A.") {
    return num;
  }

  const number = num.toString().split("").reverse().join("");
  let i = 0;
  let finalNum = "";

  for (const n of number) {
    if (i % 3 === 0 && i != 0) {
      finalNum += "," + n;
    } else {
      finalNum += n;
    }

    i++;
  }

  return finalNum.split("").reverse().join("");
}

export function getFormattedTimestamp(time) {
  const getTime = (obj) => {
    const minutes = obj.getMinutes();
    let hours = obj.getHours();
    let ap = hours < 12 ? "AM" : "PM";

    if (hours > 12) {
      hours -= 12;
    } else if (hours == 0) {
      hours = 12;
    }

    return `${hours}:${
      minutes.toString().length == 1 ? "0" + minutes.toString() : minutes
    } ${ap}`;
  };

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const timestamp = new Date(time * 1000);
  const date = timestamp.getDate();
  const month = months[timestamp.getMonth()];
  const stamp = getTime(timestamp);

  return `${date} ${month}, ${stamp}`;
}

export function getDistance(lat1, lat2, lon1, lon2) {
  function toRadians(deg) {
    return deg * (Math.PI / 180);
  }

  lat1 = toRadians(lat1);
  lat2 = toRadians(lat2);
  lon1 = toRadians(lon1);
  lon2 = toRadians(lon2);

  const dlon = lon2 - lon1;
  const dlat = lat2 - lat1;

  const a =
    Math.pow(Math.sin(dlat / 2), 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlon / 2), 2);
  const c = 2 * Math.asin(Math.sqrt(a));

  const r = 6371;

  return (c * r).toFixed(1);
}
