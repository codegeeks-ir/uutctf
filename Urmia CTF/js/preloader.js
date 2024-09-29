const givenTime = "2024-01-01T12:00:00";
const diffInMs = getTimeDiff(givenTime);
const diffInSeconds = diffInMs / 1000;
var now = new Date()

var strings = [
  "Initialzing request",
  "PastWinners: 1.retirees + 2.AlphaSeal + 3.CyberSlacker UUCTF2021",
  "PastWinners: 1.Goorbe + 2.CT 1 + 3.CyberSlacker UUCTF2021",
  "Calculating remaining...",
  "Current Time: "  + now.getFullYear() + "/" + (now.getMonth() -  -1) + "/" + now.getDate(),
  "Time remaining: " + formatDuration(diffInSeconds),
  "Locating Urmia...",
  "Initializing..."
];

var preloader = document.getElementById('preloader');
var delay = 1000;
var count = 0;
var repeat = 0;

function addLog() {
  var row = createLog('ok', count);
  preloader.appendChild(row);
  
  goScrollToBottom();
  
  count++;
  
  if (repeat == 0) {
    if (count > 3) {
      delay = 300;
    }
    
    if (count > 6) {
      delay = 100;
    }
    
    if (count > 8) {
      delay = 50;
    }
    
    if (count > 10) {
      delay = 10;
    }
  } else {
    if (count > 3) {
      delay = 10;
    }
  }
  
  if (count < strings.length) {
    setTimeout(function() {
      return addLog();
    }, delay);
  } else {
    setTimeout(function() {
      delay = 1000;
      return createLog("ok");
    }, 1000);
  }
}

function createLog(type, index) {
  var row = document.createElement('div');
  
  var spanStatus = document.createElement('span');
  spanStatus.className = type;
  spanStatus.innerHTML = type.toUpperCase();
  
  var message = (index != null) 
              ? strings[index] 
              : 'kernel: Initializing...';

  if(index == null) 
  {
    var preloader = $('#preloader');
    jQuery(preloader).fadeOut("slow");
    jQuery("#main").fadeIn("slow");
  }
  
  var spanMessage = document.createElement('span');
  spanMessage.innerHTML = message;
  
  row.appendChild(spanStatus);
  row.appendChild(spanMessage);
  
  return row;
}

function goScrollToBottom() {
  $(document).scrollTop($(document).height()); 
}

function setCookie(cname,cvalue,exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires=" + d.toGMTString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

// below method reference https://stackoverflow.com/questions/5639346/what-is-the-shortest-function-for-reading-a-cookie-by-name-in-javascript/25490531#25490531
function getCookie(a) {
  var b = document.cookie.match('(^|;)\\s*' + a + '\\s*=\\s*([^;]+)');
  return b ? b.pop() : '';
}

function checkCookie() {
  var user=getCookie("visited"); 
  if (user == 1) {   
    setCookie("visited", 1, 30); //this will update the cookie      
    jQuery("#main").fadeIn("slow"); 
  } else {  
    addLog();      
    setCookie("visited", 1, 30);   

  }
}


function getTimeDiff(givenTime) {
  const now = new Date();
  const given = new Date(givenTime);
  const diff = given.getTime() - now.getTime();
  return diff;
}

function formatDuration(milliseconds) {
  const seconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);

  const parts = [];
  if (months > 0) {
    parts.push(`${months} ${months === 1 ? 'Month' : 'Months'}`);
  }
  if (days % 30 > 0) {
    parts.push(`${days % 30} ${days % 30 === 1 ? 'day' : 'days'}`);
  }
  if (hours % 24 > 0) {
    parts.push(`${hours % 24} ${hours % 24 === 1 ? 'hour' : 'hours'}`);
  }
  if (minutes % 60 > 0) {
    parts.push(`${minutes % 60} ${minutes % 60 === 1 ? 'minute' : 'minutes'}`);
  }
  if (seconds % 60 > 0) {
    parts.push(`${seconds % 60} ${seconds % 60 === 1 ? 'second' : 'seconds'}`);
  }

  if (parts.length === 0) {
    return '0 seconds';
  } else {
    return parts.join(' and ');
  }
}

checkCookie();


