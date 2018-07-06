export function generateQuip() {
  const quips = [
    "Are you sure? Like, *sure* sure?",
    "It'd be a shame if this wasn't the right answer.",
    "Did you ACTUALLY mean to pick this one?",
    "They say right and wrong are subjective, but this is definitely the wrong answer."
  ]
  
  return quips[getRandomInt(quips.length-1)];
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}