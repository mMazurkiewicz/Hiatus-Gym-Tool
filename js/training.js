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

    // Training object
    function Training() {};

    // get input value of cycles
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


        addNewExSection.fadeOut(100);
    })

    // start training
    startButton.click(function() {
        let exercises = $('.exercise');
        let train = {};
        exercises.each(function(i) {
            train['ex-' + i] = {
                name: $(this).text(),
                time: $(this).data('time'),
                rest: $(this).data('rest')
            }
        })
        console.log(train);
        // var interval = setInterval(function() {
        //     console.log('I will be invoke every 5s');
        // }, 5000);



        startSection.fadeIn(200);
    });
})
