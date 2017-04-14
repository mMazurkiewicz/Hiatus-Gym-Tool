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
    let cyclesBorder = $('.cycles');

    // start area
    let startSection = $('.start');
    let stopButton = $('.stop');
    let exerciseName = $('.exerciseName');
    let timer = $('.timer');
    let loopNumber = $('span');

    // check 1-99 input value of cycles
    cyclesNum.blur(function() {
        let cyclesVal = cyclesNum.val();
        if (!(parseInt(cyclesVal) > 0 && parseInt(cyclesVal) < 100)) {
            $(this).val('');
        }
    })
    // add flex box to edit/add new exercise section
    function addFlex() {
      addNewExSection.css({
          'display': 'flex',
          "flex-direction": 'column',
          "justify-content": 'center',
          "align-items": 'center'
      })
    }
    // show add new exercise area
    showAddNewExSection();

    function showAddNewExSection() {
        addButton.click(function() {
            resetInputs();
            removeEditBtn();
            addNewExSection.fadeIn(200);
            addFlex();


        })
        addNewExSection.click(function() {
            resetInputs();

            removeEditBtn();

            $(this).fadeOut(200);
        })
    }


    //click somewhere else of form to exit addNewEx section
    form.click(function(event) {
        event.stopPropagation();
    })

    // add new exercise
    addExButton.click(function(event) {
        event.stopPropagation();
        let inputs = $('input');
        let exercise = [];

        inputs.each(function(index) {
            exercise.push($(this).val());
        });

        let newEx = $('<div>', {
            class: 'exercise shadow',
            "data-time": exercise[1],
            "data-rest": exercise[2]
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

        if ($('.exError')) {
            $('.exError').remove();
        }
        editExercise();
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

    // workoutInterval function
    function startWorkout(exercises, length, loop) {
        let ex = 'ex-';
        let order = 0;
        let loopsNumber = parseInt(loop);
        let loopCounter = 1;
        let name = exercises[ex + order].name;
        let time = exercises[ex + order].time;
        let rest = exercises[ex + order].rest;
        exerciseName.text(name);
        exerciseName.css("background-color", "#673AB7");
        timer.text('...');
        let interval = setInterval(function() {
            loopNumber.text(loopCounter + " of " + loopsNumber);
            if (loopCounter > loopsNumber) { //stop loop
                let finished = $('<div>');
                finished.text('FINISHED!');
                finished.css({
                    "z-index": "100",
                    "position": "fixed",
                    "display": "flex",
                    "justify-content": "center",
                    "align-items": "center",
                    "background-color": "#673AB7",
                    "color": "white",
                    "font-size": "4em",
                    "width": "100%",
                    "height": "100vh"
                });
                startSection.prepend(finished);
                finished.click(function() {
                    startSection.fadeOut(50);
                    $(this).fadeOut(300);
                })
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
                } else {
                    order = 0;
                    loopCounter++;
                    rest = exercises[ex + order].rest;
                    name = exercises[ex + order].name;
                    time = exercises[ex + order].time;
                }
            }

        }, 1000);
        stopTraining(interval);

    }

    // stop training button
    function stopTraining(inter) {
      stopButton.click(function(){
        clearInterval(inter);
        startSection.fadeOut(200);
        return;
      })
    }

    // start training
    startButton.click(function() {
        let exercises = $('.exercise');
        let workout = {};
        let loops = cyclesNum.val();

        if (exList.children().length < 2) { //check if there are exercises
            let exError = $('<div>', {
                class: 'exError'
            });
            exError.text('add some exercises');
            exError.css({
                "color": "red",
                "font-size": "0.8em"
            })
            exList.append(exError);
        } else if ($('.exError')) {
            $('.exError').remove();
        }

        if (loops == '') { //check if loops are set up
            cyclesBorder.css({
                "border-bottom": "1px solid red"
            })
            cyclesBorder.toggleClass('animated shake');
            return
        } else {
            cyclesBorder.css({
                "border-bottom": "1px solid rgba(0, 0, 0, 0.54)"
            });
            // cyclesBorder.removeClass('animated shake');
        }

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

    // remove edit button
    function removeEditBtn() {
        if ($('div.editEx').length > 0) {
            console.log('jest editex');
            $('.editEx').remove();
        }
    }

    // reset inputs
    function resetInputs() {
        let inputs = $('input');
        inputs.each(function(index) {
            $(this).val('');
        });
    }

    // edit exercises
    editExercise();

    function editExercise() {
        removeEditBtn();
        let exerciseButton = $('div .exercise');
        let editButton = $('<div>', {
            class: 'editEx shadow'
        });
        editButton.text('EDIT');


        exerciseButton.click(function(event) { // exercise button clik
            addFlex();
            addNewExSection.fadeIn(300);

            addExButton.detach();

            let $this = $(this);
            console.log($this);
            $('input[name="exName"]').val($this.text());
            $('input[name="exTime"]').val($this.data('time'));
            $('input[name="restTime"]').val($this.data('rest'));

            removeEditBtn();
            form.append(editButton);

            editButton.click(function() { // edit button click
                let timeVal = $('input[name="exTime"]').val();
                let restVal = $('input[name="restTime"]').val();
                let nameVal = $('input[name="exName"]').val();
                console.log(timeVal, restVal, nameVal);
                if (timeVal == '' || restVal == '' || nameVal == '') {
                    errorMsg.animate({
                        "opacity": "1"
                    }, 200);
                    return
                } else {
                    errorMsg.animate({
                        "opacity": "0"
                    }, 200);
                }
                $this.text($('input[name="exName"]').val());
                $this.attr('data-time', timeVal);
                $this.attr('data-rest', restVal);
                // reset inputs
                resetInputs();
                let editBtn = $('.editEx');
                editBtn.remove();
                form.append(addExButton);
                addNewExSection.fadeOut(300);
            })
        })


    }

})
