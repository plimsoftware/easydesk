  // Função para formatar a Data.
  function zeroEsquerda(num) {
    return num >= 10 ? num : `0${num}`;
  }

  export default function setDate(myDate, type) {
    let dateString = '';
    const dataSent = new Date(myDate);

    if (type.search('d') !== -1) {
      dateString += `${zeroEsquerda(dataSent.getDate())}/${zeroEsquerda(
      dataSent.getMonth() + 1 )}/${dataSent.getFullYear()}`;

      if (type.search('t') !== -1) dateString += ' ';
    }

    if (type.search('t') !== -1) dateString += `${zeroEsquerda(dataSent.getHours())}:${zeroEsquerda(
      dataSent.getMinutes() + 1 )}:${zeroEsquerda(dataSent.getSeconds())}`;

    return dateString;
  }
