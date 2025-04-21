import * as readline from 'readline';

let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question1() {
  return new Promise((resolve, reject) => {
    rl.question('What is your name and major? $', (answer) => {
      console.log(`You said: ${answer}`)
      resolve(answer)
    })
  });
}

function question2() {
  return new Promise((resolve, reject) => {
    rl.question('What is the current date and time (including year)? ', (answer) => {
      console.log(`You said: ${answer}`)
      resolve(answer)
    })
  });
}

const main = async () => {
  await question1()
  await question2()
  rl.close()
}

main()

