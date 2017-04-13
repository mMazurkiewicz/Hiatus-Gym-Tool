$(function() {
    console.log('ready!');

    // variables
    let addButton = $('.addButton');
    let startButton = $('.startButton');
    let addExButton = $('.addEx');
    let addNewExSection = $('#addNewEx');
    let exList = $('#exList');
    let errorMsg = $('div.error');
    let form = $('form');
    let cyclesNum = $('.cyclesNum');

    // start area
    let startSection = $('.start');
    let stopButton = $('.stop');
    let exerciseName = $('.exerciseName');
    let timer = $('.timer');
    let loop = $('span');

    // check 1-99 input value of cycles
    cyclesNum.blur(function() {
        let cyclesVal = cyclesNum.val();
        if (!(parseInt(cyclesVal) > 0 && parseInt(cyclesVal) < 100)) {
            $(this).val('');
        }
    })

    // show add new exercise area
    addButton.click(function() {
        addNewExSection.fadeIn(200);
        addNewExSection.css({
            'display': 'flex',
            "flex-direction": 'column',
            "justify-content": 'center',
            "align-items": 'center'
        })
        addNewExSection.click(function() {
            $(this).fadeOut(200);
        })
        // console.log(exercise);
    })

    //click somewhere else of form to exit addNewEx section
    form.click(function(event) {
        event.stopPropagation();
    })

    // add new exercise
    addExButton.click(function() {
        let inputs = $('input');
        let exercise = [];

        inputs.each(function(index) {
            exercise.push($(this).val());
        });

        let newEx = $('<div>', {
            class: 'exercise shadow',
            "data-time": exercise[1],
            "data-rest": exercise[2],
            "data-finnished": false
        });


        if (exercise[0] == '' || exercise[1] == '' || exercise[2] == '') {
            errorMsg.animate({
                "opacity": "1"
            }, 200);
            return
        } else {
            errorMsg.animate({
                "opacity": "0"
            }, 200);
        }

        newEx.text(exercise[0]);
        exList.append(newEx);

        // reset inputs
        inputs.each(function(index) {
            $(this).val('');
        });


        addNewExSection.fadeOut(100);
    })
    // make Timer Red
    function makeTimerRed(i) {
        if (i < 6) {
            timer.css('color', 'red');
        } else {
            timer.css('color', 'inherit');
        }
    }

    // workout function
    function startWorkout(exercises, length, loop) {
        let ex = 'ex-';
        let order = 0;
        let name = exercises[ex + order].name;
        let time = exercises[ex + order].time;
        let rest = exercises[ex + order].rest;
        let interval = setInterval(function() {
             
            if (order === length) {
                exerciseName.fadeOut(200);
                timer.text('finished!');
                clearInterval(interval);
                return
            }
            if (time < 1) {
                exerciseName.css("background-color", "#4CAF50");
                exerciseName.text('rest!');
                timer.text(rest);
                makeTimerRed(rest);
                rest--;
            } else {
                exerciseName.css("background-color", "#673AB7");
                exerciseName.text(name);
                timer.text(time);
                makeTimerRed(time);
                time--;
            }
            if (time < 1 && rest < 1) {
                order++;
                if (!(order === length)) {
                    rest = exercises[ex + order].rest;
                    name = exercises[ex + order].name;
                    time = exercises[ex + order].time;
                }
            }

        }, 1000)
    }

    // start training
    startButton.click(function() {
        let exercises = $('.exercise');
        let workout = {};
        let loops = cyclesNum.val();

        exercises.each(function(i) {
            workout['ex-' + i] = {
                name: $(this).text(),
                time: $(this).data('time'),
                rest: $(this).data('rest'),
                fin: $(this).data('finished')
            }
        })

        startWorkout(workout, exercises.length, loops);

        startSection.fadeIn(200);
    });
})
