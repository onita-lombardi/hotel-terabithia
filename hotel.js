//ATIVIDADE HOTEL TERABITHIA

//3.1 Identidade, autenticação e sessão
var nome_hotel = "Terabithia";
var nome_usuario = "Onita";
var lista_hospedes = [];
var lista_reservas = [];

const formatarReal = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

var lista_quartos = [{ id: 1, andar: 1, numero: "01", tipo: "Standard", ocupado: false },
{ id: 2, andar: 1, numero: "02", tipo: "Standard", ocupado: false },
{ id: 3, andar: 1, numero: "03", tipo: "Standard", ocupado: false },
{ id: 4, andar: 1, numero: "04", tipo: "Standard", ocupado: false },
{ id: 5, andar: 1, numero: "05", tipo: "Standard", ocupado: false },
{ id: 6, andar: 2, numero: "06", tipo: "Standard", ocupado: false },
{ id: 7, andar: 2, numero: "07", tipo: "Standard", ocupado: false },
{ id: 8, andar: 2, numero: "08", tipo: "Standard", ocupado: false },
{ id: 9, andar: 2, numero: "09", tipo: "Standard", ocupado: false },
{ id: 10, andar: 2, numero: "10", tipo: "Standard", ocupado: false },
{ id: 11, andar: 3, numero: "11", tipo: "Executivo", ocupado: false },
{ id: 12, andar: 3, numero: "12", tipo: "Executivo", ocupado: false },
{ id: 13, andar: 3, numero: "13", tipo: "Executivo", ocupado: false },
{ id: 14, andar: 3, numero: "14", tipo: "Executivo", ocupado: false },
{ id: 15, andar: 3, numero: "15", tipo: "Executivo", ocupado: false },
{ id: 16, andar: 4, numero: "16", tipo: "Luxo", ocupado: true },
{ id: 17, andar: 4, numero: "17", tipo: "Luxo", ocupado: true },
{ id: 18, andar: 4, numero: "18", tipo: "Luxo", ocupado: true },
{ id: 19, andar: 4, numero: "19", tipo: "Luxo", ocupado: true },
{ id: 20, andar: 4, numero: "20", tipo: "Luxo", ocupado: true }];

var quantidade_quartos_ocupados = 0;

function autenticacao() {
    let senha;
    let tentativas = 1;

    alert("Bem-vindo ao " + nome_hotel + ".");
    nome_usuario = prompt("Digite seu nome de usuário: ");

    do {
        senha = prompt("Digite sua senha: ");
        if (senha === "2") { //"2678"
            alert("Bem-vindo ao Hotel " + nome_hotel + ", " + nome_usuario +
                ". É um imenso prazer ter você por aqui!");
            tentativas = 4;
            inicio();
        } else {
            alert("Senha inválida.");
            tentativas++;
            if (tentativas === 4) {
                alert("Máximo de tentativas alcançadas. Tente novamente mais tarde.");
            }
        }
    } while (tentativas < 4);
}

//3.2 Menu principal e organização
function inicio() {

    let escolha = parseInt(prompt("Selecione uma opção:\n 1.) Reserva de Quartos\n" +
        " 2.) Cadastro de Hóspedes\n 3.) Eventos\n" +
        " 4.) Ar-Condicionado\n 5.) Abastecimento de Carros\n" +
        " 6.) Relatórios Operacionais\n 7.) Sair"));

    switch (escolha) {
        case 1:
            reservar_quarto();
            break;
        case 5:
            abastecimento();
            break;
        case 7:
            sair();
            break;
        default:
            erro_inicio();
            break;
    }
}

function sair() {
    let confirma = confirm('Você deseja sair?');
    if (confirma) {
        alert("Muito obrigado e até logo, " + nome_usuario + ".");
    } else {
        inicio();
    }
}

function erro_inicio() {
    alert('Por favor, informe um número entre 1 e 7.');
    inicio();
}

// 4) Subprograma 1 — Reservas de Quartos (nível avançado)

function reservar_quarto() {
    let valor_diaria;
    let quantidade_diaria;
    let hospede;
    let tipo_num;
    let invalido = true;
    let quarto_escolhido;
    let quartos_livres;
    let lista_tipo_quarto = ["Standart", "Executivo", "Luxo"];
    let subtotal;
    let fator_tipo_quarto;
    let taxa_servico;
    let total;
    let confirmar_reserva;
    let index_quarto_escolhido;


    valor_diaria = parseFloat(prompt("Reservas\nInforme o valor da diária: "));
    if (isNaN(valor_diaria) || valor_diaria < 0) {
        valor_invalido();
        return;
    }

    quantidade_diaria = parseInt(prompt("Informe a quantidade de diárias (1-30): "));
    if (isNaN(quantidade_diaria) || quantidade_diaria < 0 || quantidade_diaria > 30) {
        valor_invalido();
        return;
    }

    hospede = prompt("Informe o nome do hóspede:");

    tipo_num = escolher_tipo_quarto();

    do {
        quartos_livres = mapa_quartos_livres_por_tipo(tipo_num);

        if (quartos_livres.includes("Todos")) {
            alert(quartos_livres + "\nPor favor, escolha outro tipo de quarto.");
            tipo_num = escolher_tipo_quarto();

        } else {

            quarto_escolhido = parseInt(prompt(quartos_livres + "\n\nEscolha um quarto (1-20): "));
            if (isNaN(quarto_escolhido)) {
                alert("Digite apenas números para escolher o quarto.");
            } else if (quarto_escolhido <= 0 || quarto_escolhido > 20) {
                alert("Número de quarto inválido.");
            } else if (!(quartos_livres.includes(quarto_escolhido))) {
                alert("Quarto " + quarto_escolhido + " não é do tipo " +
                    lista_tipo_quarto[tipo_num - 1] + ".\nPor favor, escolha outro quarto.");
            } else {
                invalido = false;
            }
        }
    } while (invalido);

    fator_tipo_quarto = (tipo_num === 1) ? 1 : (tipo_num === 2) ? 1.35 : 1.65;

    subtotal = valor_diaria * quantidade_diaria * fator_tipo_quarto;
    taxa_servico = subtotal * 0.1;
    total = subtotal + taxa_servico;


    invalido = true;

    do {
        confirmar_reserva = prompt("Resumo:\nHóspede: " + hospede + "\nQuarto: " + quarto_escolhido + " (" +
            lista_tipo_quarto[tipo_num - 1] + ")\nSubtotal: " + formatarReal.format(subtotal) +
            "\nTaxa de serviço (10%): " + formatarReal.format(taxa_servico) + "\nTotal: " +
            formatarReal.format(total) + "\n\n" + nome_usuario + ", confirma a reserva? (S/N):");

        if (confirmar_reserva.toUpperCase() === "S") {
            index_quarto_escolhido = lista_quartos.findIndex(quarto => quarto.numero == quarto_escolhido);
            lista_quartos[index_quarto_escolhido].ocupado = true;
            lista_reservas.push({
                hospede: hospede, quarto: lista_quartos[index_quarto_escolhido].numero,
                diarias: quantidade_diaria, total: total
            });
            alert("Reserva efetuada com sucesso.\n");
            mapa_status_todos_quartos();
            invalido = false;
        } else if (confirmar_reserva.toUpperCase() === "N") {
            alert("Reserva não efetuada.");
            invalido = false;
        } else {
            alert("Opção não válida.")
        }
    } while (invalido);

    inicio();

}

function mapa_status_todos_quartos() {
    let mapa = "  Mapa de quartos\n";
    let andar_1 = "1° andar: ";
    let andar_2 = "2° andar: ";
    let andar_3 = "3° andar: ";
    let andar_4 = "4° andar: ";

    for (let i = 0; i < lista_quartos.length; i++) {

        switch (lista_quartos[i].andar) {
            case 1:
                if (lista_quartos[i].ocupado) {
                    andar_1 += " O ";
                } else {
                    andar_1 += " L ";
                }
                break;
            case 2:
                if (lista_quartos[i].ocupado) {
                    andar_2 += " O ";
                } else {
                    andar_2 += " L ";
                }
                break;
            case 3:
                if (lista_quartos[i].ocupado) {
                    andar_3 += " O ";
                } else {
                    andar_3 += " L ";
                }
                break;
            case 4:
                if (lista_quartos[i].ocupado) {
                    andar_4 += " O ";
                } else {
                    andar_4 += " L ";
                }
                break;
        }
    }

    mapa += andar_4 + "\n" + andar_3 + "\n" + andar_2 + "\n" + andar_1 + "\n\nO = ocupado\nL = livre";

    alert(mapa);
}

function mapa_quartos_livres_por_tipo(tipo) {
    let mapa = "";
    let andar = "";
    let andar_aux = "";
    let tipo_por_extenso = "";

    switch (tipo) {
        case 1: //Standard
            andar = "1° andar: ";
            andar_aux = "2° andar: ";
            for (let i = 0; i < lista_quartos.length; i++) {
                if (lista_quartos[i].andar === 1 && lista_quartos[i].tipo.toLowerCase() === "standard" && lista_quartos[i].ocupado === false) {
                    andar += " " + lista_quartos[i].numero + " ";
                } else if (lista_quartos[i].andar === 2 && lista_quartos[i].tipo.toLowerCase() === "standard" && lista_quartos[i].ocupado === false) {
                    andar_aux += " " + lista_quartos[i].numero + " ";
                }
            }
            tipo_por_extenso = "Standard";
            break;
        case 2: //Executivo
            andar = "3° andar: ";
            for (let i = 0; i < lista_quartos.length; i++) {
                if (lista_quartos[i].andar === 3 && (lista_quartos[i].tipo).toLowerCase() == "executivo" && lista_quartos[i].ocupado === false) {
                    andar += " " + lista_quartos[i].numero + " ";
                }
            }
            tipo_por_extenso = "Executivo";
            break;
        case 3: //Luxo
            andar = "4° andar: ";
            for (let i = 0; i < lista_quartos.length; i++) {
                if (lista_quartos[i].andar === 4 && lista_quartos[i].tipo.toLowerCase() === "luxo" && lista_quartos[i].ocupado === false) {
                    andar += " " + lista_quartos[i].numero + " ";
                }
            }
            tipo_por_extenso = "Luxo";
            break;
    }

    if (andar === "1° andar: " || andar === "3° andar: " || andar === "4° andar: ") {
        mapa = "Todos os quartos " + tipo_por_extenso + " estão ocupados.";
    } else {
        andar_aux += (andar_aux === "") ? "" : "\n";
        mapa = "Mapa de quartos livres " + tipo_por_extenso + "\n" + andar_aux + andar;
    }

    return (mapa);
}

function escolher_tipo_quarto() {
    let tipo_texto;
    let tipo_num;
    let invalido = true;
    let lista_tipo_quarto = ["S", "E", "L"];
    do {
        tipo_texto = prompt("Tipo de quarto (S/E/L):").toUpperCase();
        if (!isNaN(tipo_texto) || !lista_tipo_quarto.includes(tipo_texto)) {
            alert("Tipo de quarto inválido.");
        } else {
            invalido = false;
        }
    } while (invalido);

    tipo_num = (tipo_texto === "S") ? 1 : (tipo_texto === "E") ? 2 : 3;
    return tipo_num;
}

function valor_invalido() {
    alert("Valor inválido, " + nome_usuario + ".");
    inicio();
}

// 5) Subprograma 2 — Cadastro de Hóspedes (com índices)


// 7) Subprograma 4 — Ar-Condicionado (comparativo técnico)
function orcamento_ar_condicionado() {
    let lista_orcamentos = [];
    let empresa;
    let valor_aparelho;
    let quantidade;
    let desconto;
    let minimo_para_desconto;
    let deslocamento;
    let valor_bruto;
    let total;
    let infomar_outra;
    let valor_infomar_outra;
    let preco_melhor_orcamento = 0;
    let empresa_melhor_orcamento;
    //let index_melhor_orcamento;
    let preco_pior_orcamento = 0;
    //let index_pior_orcamento;
    let empresa_pior_orcamento;
    let texto_final;
    let diferenca_percentual;

    let continuar = true;

    do {

        empresa = prompt("Ar-condicionado\nInforme o nome da empresa: ");

        do {
            valor_aparelho = parseFloat(prompt("Informe o valor do serviço do aparelho: "));
        } while (validar_preco(valor_aparelho));

        do {
            quantidade = parseInt(prompt("Informe a quantidade de aparelhos: "));
        } while (validar_quantidade(quantidade));

        do {
            desconto = parseFloat(prompt("Informe o percentual de desconto (0 a 100): "));
        } while (validar_desconto(desconto));

        do {
            minimo_para_desconto = parseInt(prompt("Informe a quantidade de aparelhos para receber desconto: "));
        } while (validar_quantidade(minimo_para_desconto));

        do {
            deslocamento = parseFloat(prompt("Informe valor do deslocamento:"));
        } while (validar_preco(deslocamento));

        valor_bruto = valor_aparelho * quantidade;
        if (quantidade >= minimo_para_desconto) {
            let valor_desconto = valor_bruto * (desconto / 100);
            total = valor_bruto - valor_desconto + deslocamento
        } else {
            total = valor_bruto;
        }

        alert("O serviço de " + empresa + " custará " + formatarReal.format(total) + ".");

        lista_orcamentos.push({
            empresa: empresa, valor_aparelho: valor_aparelho,
            quantidade: quantidade, desconto: desconto,
            minimo_para_desconto: minimo_para_desconto,
            deslocamento: deslocamento, total: total
        });

        if (total < preco_melhor_orcamento) {
            preco_melhor_orcamento = total;
            empresa_melhor_orcamento = empresa;
        }

        if (total > preco_pior_orcamento) {
            preco_pior_orcamento = total;
            empresa_pior_orcamento = empresa;
        }

        do{
            valor_infomar_outra = prompt("Deseja informar novos dados, " + nome_usuario + "? (S/N): ").toUpperCase();
            if(valor_infomar_outra !== "N" || valor_infomar_outra !== "S"){
                alert("Opção inválida.");
                infomar_outra = true;
            }else if(valor_infomar_outra === "N"){
                infomar_outra = false;
                continuar = false;
            }else{
                infomar_outra = false;
            }
        }while(infomar_outra);
        
    } while (continuar);

    if(preco_pior_orcamento === 0){
        texto_final = "Apenas 1 empresa informada.\nMelhor orçamento: " + empresa_melhor_orcamento +
                        " - " + formatarReal.format(preco_melhor_orcamento);
    }else{
        diferenca_percentual = (((preco_melhor_orcamento - preco_pior_orcamento)/preco_melhor_orcamento) * 100);
        texto_final = "Menor orçamento: "  + empresa_melhor_orcamento +
                        " - " + formatarReal.format(preco_melhor_orcamento) +
                        "\n Maior orçamento: "  + empresa_pior_orcamento +
                        " - " + formatarReal.format(preco_pior_orcamento) +
                        "\n\nMelhor orçamento: " + empresa_melhor_orcamento +
                        " - " + formatarReal.format(preco_melhor_orcamento);
    }
    
    alert(texto_final);
}

function validar_quantidade(quantidade) {
    if (isNaN(quantidade) || quantidade <= 0) {
        alert("Quantidade inválida.");
        return true;
    } else {
        return false;
    }
}

function validar_desconto(desconto) {
    if (isNaN(desconto) || desconto < 0 || desconto > 100) {
        alert("Desconto inválido.");
        return true;
    } else {
        return false;
    }
}

// 8) Subprograma 5 — Abastecimento (análise econômica)
function abastecimento() {
    let alcool_wayne_oil;
    let gasolina_wayne_oil;

    let alcool_stark_petrol;
    let gasolina_stark_petrol;

    let combustivel_ideal_wayne_oil;
    let combustivel_ideal_stark_petrol;

    let total_wayne_oil = 0;
    let total_stark_petrol = 0;

    let posto_mais_barato;

    let litros_max_tanque = 42;


    do {
        alcool_wayne_oil = parseFloat(prompt("Abastecimento\nPosto Wayne Oil" +
            "\nInforme o preço do álcool:"))
    } while (validar_preco(alcool_wayne_oil));

    do {
        gasolina_wayne_oil = parseFloat(prompt("Posto Wayne Oil" +
            "\nInforme o preço da gasolina:"))
    } while (validar_preco(gasolina_wayne_oil));

    do {
        alcool_stark_petrol = parseFloat(prompt("Stark Petrol" +
            "\nInforme o preço do álcool:"))
    } while (validar_preco(alcool_stark_petrol));

    do {
        gasolina_stark_petrol = parseFloat(prompt("Stark Petrol" +
            "\nInforme o preço da gasolina:"))
    } while (validar_preco(gasolina_stark_petrol));

    combustivel_ideal_wayne_oil = combustivel_ideal(alcool_wayne_oil, gasolina_wayne_oil);
    combustivel_ideal_stark_petrol = combustivel_ideal(alcool_stark_petrol, gasolina_stark_petrol);

    if (combustivel_ideal_wayne_oil === "Álcool") {
        total_wayne_oil = litros_max_tanque * alcool_wayne_oil;
    } else {
        total_wayne_oil = litros_max_tanque * gasolina_wayne_oil;
    }

    if (combustivel_ideal_stark_petrol === "Álcool") {
        total_stark_petrol = litros_max_tanque * alcool_stark_petrol;
    } else {
        total_stark_petrol = litros_max_tanque * gasolina_stark_petrol;
    }

    if (total_wayne_oil <= total_stark_petrol) {
        posto_mais_barato = "Wayne Oil";
    } else {
        posto_mais_barato = "Stark Petrol";
    }

    let texto = "Abastecimento\nWayne Oil -> Álcool: " + formatarReal.format(alcool_wayne_oil) +
        " | Gasolina: " + formatarReal.format(gasolina_wayne_oil) +
        "\nStark Petrol -> Álcool: " + formatarReal.format(alcool_stark_petrol) +
        " | Gasolina: " + formatarReal.format(gasolina_stark_petrol) +
        "\n\nWayne Oil: melhor opção = " + combustivel_ideal_wayne_oil +
        " | Total (42L) = " + formatarReal.format(total_wayne_oil) +
        "\nStark Petrol: melhor opção = " + combustivel_ideal_stark_petrol +
        " | Total (42L) = " + formatarReal.format(total_stark_petrol) + "\n\n" +
        nome_usuario + ", é mais barato abastecer com gasolina no posto " +
        posto_mais_barato + ".";


    alert(texto);
}

function validar_preco(preco) {
    if (isNaN(preco) || preco <= 0) {
        alert("Preço inválido.");
        return true;
    } else {
        return false;
    }
}

function combustivel_ideal(preco_alcool, preco_gasolina) {
    if (preco_alcool <= 0.70 * preco_gasolina) {
        return "Álcool";
    } else {
        return "Gasolina";
    }
}

orcamento_ar_condicionado();
//começa o programa
//autenticacao();