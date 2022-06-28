//массив с картами
let arrP = [0,1,2,3,4,0,1,2,3,4,0,1,2,3,4,0,1,2,3,4];
let arrAI = [0,1,2,3,4,0,1,2,3,4,0,1,2,3,4,0,1,2,3,4];

//создаем очереди
let qP = new queuePlayer();
let qAI = new queueAI();
let badcounter = 0;

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array;
  }
function queuePlayer() {
    let collectionPlayer = [];

    this.print = function() {
        console.log(collectionPlayer);
    }

    this.enqueue = function(element) {
        collectionPlayer.push(element);
    }

    this.dequeue = function() {
        return collectionPlayer.shift();
    }

    this.front = function() {
        return collectionPlayer[0];
    }

    this.isEmpty = function() {
        return collectionPlayer.length === 0;
    }

    this.size = function() {
        return collectionPlayer.length;
    }
}
function queueAI() {
    let collectionAI = [];

    this.print = function() {
        console.log(collectionAI);
    }

    this.enqueue = function(element) {
        collectionAI.push(element);
    }

    this.dequeue = function() {
        return collectionAI.shift();
    }

    this.front = function() {
        return collectionAI[0];
    }

    this.isEmpty = function() {
        return collectionAI.length === 0;
    }

    this.size = function() {
        return collectionAI.length;
    }
}
function createQueue() {
    for(let k = 0; k < arrP.length; k++) {
        qP.enqueue(arrP[k]);
    }
    for(let k = 0; k < arrAI.length; k++) {
        qAI.enqueue(arrAI[k]);
    }
}
function createDefCards(){
    let defP = [];
    let defAI = [];
    for(let k = 0; k < 3; k++){
        defP.push(qP.dequeue());
    }
    for(let k = 0; k < 3; k++){
        defAI.push(qAI.dequeue());
    }
    return {defP, defAI};
}
function battleP(){
    const {defAI} = createDefCards();
    while(defAI.length !==0){
        let attakP1 = qP.dequeue();
        let str = defAI.join(); 
        /*
        let checklose = 0;
        let checklosenum = [...defAI];
        console.log('прошло1');
        //Проверка того что, карта атаки может атаковать хоть одну карту защиты
        for(let k=0; checklosenum.length !==0; k++){
            if(attakP1<checklosenum[k]){
                checklose = checklose + 1;
                checklosenum.pop();
            } 
        }
        console.log('прошло2');
        if (checklose==3){
            alert(`К сожалению ваша карта не может побить ни одну из карт противника.\nКарты защиты противка - ${str}.\nВаша карта атаки - ${attakP1}`);
            qAI.enqueue(attakP1);
            break;
        }
        console.log('прошло3');
        */
        //Выбор атакующим карты защиты
        const targetB = prompt(`Карты защиты противка - ${str}.\nВаша карта атаки - ${attakP1} \nВыберите какую карту противника будете атаковать \nВведите значение от 1 до 3 в зависимости от номера карты`);
        if(attakP1 > defAI[targetB-1]){
            qP.enqueue(defAI[targetB-1]);
            defAI.pop();
            alert("Отлично! Выкладываем вам новую карту");
        }  
        else{
            alert("Эта карта противника не может быть побита вашей картой.");
            var str100 = 0;
            let dopdefAI = [...defAI];
            while(dopdefAI.length !==0){
                if(attakP1 > dopdefAI[targetB-1]){
                    str100 = dopdefAI.join(); 
                    dopdefAI.pop();
                }
            }
            if(str100 !==0){
                const rtargetB = prompt(`Выберите номер другой карты.\nНа этот раз выведем вам карты, которвы вы можете побить \n ${str100}`);
                qP.enqueue(defAI[rtargetB-1]);
                defAI.pop();
            }
        }
        console.log('прошло4');
        if(defAI.length ==0) {badcounter +=1;}
        console.log('прошло5');
     }
}


shuffle(arrP);
shuffle(arrAI);
createQueue();
battleP();



