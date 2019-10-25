let oddProp = false;

function runTest(test, times = 1) {
    let conuter = times;
    test.initTest ? test.initTest() : null;
    while (conuter) {
        oddProp = !oddProp;
        test.beforeTest ? test.beforeTest() : null;
        window.performance.mark(`${test.id}Start`);
        test.run(test.props[oddProp ? 1 : 0]);
        window.performance.mark(`${test.id}Stop`);
        window.performance.measure(`${test.id}`, `${test.id}Start`, `${test.id}Stop`);
        conuter--;
        test.afterTest ? test.afterTest() : null;
    }
    updateResults();
}

function updateResults() {
    const measures = window.performance.getEntriesByType('measure')

    function getCsvLink(data) {
        let csvContent = "data:text/csv;charset=utf-8,";
        data.forEach(function(result) {
            csvContent += result + ";" + "\r\n";
        });
        return encodeURI(csvContent);
    }

    function getNewResultList(measures) {
        if (measures) {
            let newResultsList = [];
            document.testList.forEach(test => {
                let resultsData = measures
                    .filter(measure => {
                        return measure.name.search(test.id) > -1 ? true : false;
                    })
                    .map(measure => {
                        return measure.duration;
                    });
                if (resultsData.length > 0)
                    newResultsList.push({
                        id: test.id,
                        name: test.name,
                        data: resultsData,
                        downloadLink: getCsvLink(resultsData, test.id)
                    });
            });
            return newResultsList;
        }
        return [];
    }

    const results = getNewResultList(measures);

    const resultsHtml = results.map(result => {
        return `<tr key={result.id}>
            <td>${result.id}</td>
            <td>${result.data.length}</td>
            <td>${result.data.shift()}</td>
            <td>${result.data.length > 0 ? result.data.reduce((sum, item) => {
            return sum + item;
        }) / result.data.length : 'brak elementów'}</td>
            <td><a href=${result.downloadLink} download=${result.id + ".csv"}>Pobierz</a></td>
        </tr>`
    });
    if (resultsHtml.length > 0) {
        $('#results-info').css('display','none');
        $('#results-table').css("display",'table');
        $('#results-table').css("width",'100%');
        $('#results').html(resultsHtml)
    } else {
        $('#results-info').css('display','block');
        $('#results-table').css('display', 'none');

    }
}


$( document ).ready(function() {
    let testList = document.testList;

    testList.map(test => {
        $("#select-test").append(`<option value=${test.id}>[${test.id}] ${test.name}</option>`)
    })

    $("#run-test-btn").on('click', (e) => {
        runTest(testList[$("#select-test").prop('selectedIndex')], $("#repeat-amount").val());
    })
});
