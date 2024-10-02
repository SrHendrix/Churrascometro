document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('form-participantes');
    const resultadosTbody = document.getElementById('resultados');
    const statusWrapper = document.querySelector('.status-wrapper');

    /* CALCULANDO A QUANTIDADE DE ITENS */

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const homens = parseInt(document.getElementById('input-part-h').value);
        const mulheres = parseInt(document.getElementById('input-part-m').value);
        const criancas = parseInt(document.getElementById('input-part-c').value);
        const bebemAlcool = parseInt(document.getElementById('input-part-ba').value);

        if (homens === 0 && mulheres === 0 && criancas === 0) {
            displayMessage('Preencha pelo menos um campo.');
            return;
        }

        if (homens + mulheres < 1) {
            displayMessage('Deve haver pelo menos um adulto.');
            return;
        }

        if (bebemAlcool > homens + mulheres) {
            displayMessage('Número de pessoas que consomem bebidas alcólicas suspeito');
            return;
        }

        const pessoas = homens + mulheres + criancas;
        const adultos = homens + mulheres;

        const itens = [
            {
                item: 'Carne',
                unidade: 'Kg',
                qtde: (0.4 * homens + 0.32 * mulheres + 0.2 * criancas).toFixed(2),
            },
            {
                item: 'Pão de alho',
                unidade: 'Unidade',
                qtde: 2 * adultos + 1 * criancas,
            },
            { item: 'Carvão', unidade: 'Kg', qtde: 1 * pessoas },
            { item: 'Sal', unidade: 'g', qtde: 4 * pessoas },
            { item: 'Gelo', unidade: 'Saco 5Kg', qtde: 5 * Math.floor(pessoas / 10) },
            {
                item: 'Refrigerante',
                unidade: 'Garrafa 2L',
                qtde: 1 * Math.floor(pessoas / 5),
            },
            { item: 'Água', unidade: 'Garrafa 1L', qtde: 1 * Math.floor(pessoas / 5) },
            { item: 'Cerveja', unidade: 'Garrafa 600ml', qtde: 3 * bebemAlcool },
        ];

        resultadosTbody.innerHTML = ''; 
        statusWrapper.innerHTML = ''; 

        itens.forEach(function (item) {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.item}</td>
                <td>${item.qtde}</td>
                <td>${item.unidade}</td>
            `;
            resultadosTbody.appendChild(row);
        });
    });

    /* APAGANDO INFORMAÇÕES DO FORMULÁRIO */

    document.getElementById('btn-part-reset').addEventListener('click', function () {
        form.reset();
        resultadosTbody.innerHTML = "";
        statusWrapper.innerHTML = "";
    });

    function displayMessage(message) {
        statusWrapper.innerHTML = `<p class="error-message">${message}</p>`;
    }
});
