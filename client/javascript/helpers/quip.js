export function generateQuip() {
  const quips = [
    "Are you sure? Like, *sure* sure?",
    "It'd be a shame if this wasn't the right answer.",
    "Did you ACTUALLY mean to pick this one?",
    "They say right and wrong are subjective, but this is definitely wrong answer.",
    "Very...creative answer.",
    "Quick, before it's too late! Change this answer!",
    "This is the wrong answer. Seriously. Why would I lie?",
    "How sad would you be if this was the wrong answer?",
    "You're trying to guess the RIGHT answer, right? Just making sure..."
  ]
  
  return quips[getRandomInt(quips.length)];
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}