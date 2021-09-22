function formatOnDateFocusOut(e){
    e.target.type='text';
    if (e.target.value) e.target.value=e.target.value.split('-').reverse().join('.')
}
function formatDateOnFocusIn(e){
    if (e.target.value) e.target.value=new Date(e.target.value.split('.').reverse().join('-')).toISOString().substring(0,10)
    console.log(e.target.value)
    e.target.type='date';
}

function formatOnTimeFocusOut(e){
    e.target.type='text';
}
function formatTimeOnFocusIn(e){
    e.target.type='time';
}


const dateEl = document.querySelector('#tickets-date-pick');
dateEl.addEventListener('focusout', formatOnDateFocusOut);
dateEl.addEventListener('focus', formatDateOnFocusIn);


const timeEl = document.querySelector('#tickets-time-pick');
timeEl.addEventListener('focusout', formatOnTimeFocusOut);
timeEl.addEventListener('focus', formatTimeOnFocusIn);

//small options in select
// const selectOpts=document.querySelector('#tickets-select-type').querySelectorAll('option')
// selectOpts.forEach(opt=>{
// if(opt.textContent.length>20)
// opt.textContent=x.textContent.substring(0,20)+'...';
// })

function humanReadableDate(date){
    console.log(date)
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]; 
    return `${days[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}`
}
const testDate = new Date ('2022-08-19  16:30');
document.querySelector('#overview-date').innerHTML = humanReadableDate(testDate)
document.querySelector('#overview-time').innerHTML = testDate.getHours() + ':' + testDate.getMinutes()

function cardNumberValidator(e){
    if (e.key != 'Backspace') e.preventDefault();
    // console.log(e.target.value.split(' ').join(''))
    let val = e.target.value.split(' ').join('')
    if (['1','2','3','4','5','6','7','8','9','0'].indexOf(e.key)>=0 && val.length < 16 ){
        val += e.key;
    }
    e.target.value = `${val.slice(0,4)} ${val.slice(4,8)} ${val.slice(8,12)} ${val.slice(12)}`.trim()
    
}
document.querySelector("#card-number").addEventListener('keydown', cardNumberValidator);

function cardMonthValidator(e){
    if (e.key != 'Backspace') e.preventDefault();
    console.log(e.target.key)
    let val = e.target.value
    if (['1','2','3','4','5','6','7','8','9','0'].indexOf(e.key)>=0){
        val += e.key;
    }
    val = +val
    if (val < 0) {
        e.target.value = '00'
        return
    }
    if (val < 10) {
        e.target.value = '0'+val
        return
    }
    if (val < 13) {
        e.target.value = val
        return
    }
     e.target.value = '12'

    
}

document.querySelector('#card-exp-m').addEventListener('keydown',cardMonthValidator)
document.querySelector('#card-exp-m').addEventListener('input',cardMonthValidator)
document.querySelector('#card-exp-m').addEventListener('change',cardMonthValidator)

function cardYearValidator(e){
    if (e.key != 'Backspace') e.preventDefault();
    console.log(e.target.key)
    let val = e.target.value
    if (['1','2','3','4','5','6','7','8','9','0'].indexOf(e.key)>=0){
        val += e.key;
    }
    val = +val
    if (val < 2021) {
        e.target.value = '2021'
        return
    }
    if (val > 2999) {
        e.target.value = '2999'
        return
    }
    
     e.target.value = val
}
document.querySelector('#card-exp-y').addEventListener('keydown',cardYearValidator)

function stepper(that,direction){ //for using as onclick for step buttons in card form
    // console.log(that)
    const event = new Event('change');
    if (direction === 'up'){
        that.nextElementSibling.stepUp()
        that.nextElementSibling.dispatchEvent(event)
    } else {
        that.previousElementSibling.stepDown()
        that.previousElementSibling.dispatchEvent(event)
    }
}