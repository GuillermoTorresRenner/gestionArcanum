import { jsPDF } from "jspdf";
import { useEstilos } from "src/stores/useEstilos";
import { useRecetas } from "src/stores/useRecetas";

const receta = useRecetas();
const estilo = useEstilos();
estilo.setEstiloByName(receta.getReceta.estiloBase);
const doc = new jsPDF();

function getRecetaPDF() {
  // Encabezado
  doc.addImage("src/assets/Logo.png", 10, 10, 20, 20);
  doc.addImage("src/assets/Logo.png", 180, 10, 20, 20);
  doc.setFontSize(22);
  doc.text(`Receta ${receta.getReceta.nombre} by Arcanum`, 105, 20, {
    align: "center",
  });
  doc.setFontSize(18);
  doc.text(
    `${receta.getReceta.estiloBase}: ${receta.getReceta.volumenBatch} Litros`,
    105,
    30,
    {
      align: "center",
    }
  );

  doc.line(0, 35, 210, 35);

  //Párametros de la receta
  doc.text("Parámetros de la receta", 105, 42, {
    align: "center",
  });
  doc.setFontSize(14);

  doc.text(`DI: ${receta.getReceta.densidadInicialObjetivo}`, 10, 50, {
    align: "left",
  });
  doc.text(`DF: ${receta.getReceta.densidadFinalObjetivo}`, 10, 55, {
    align: "left",
  });
  doc.text(`IBUs: ${receta.getReceta.ibuObjetivo}`, 50, 50, {
    align: "left",
  });
  doc.text(`SRM: ${receta.getReceta.srmEstimado}`, 50, 55, {
    align: "left",
  });
  doc.text(`ABV: ${receta.getReceta.abvEstimado} °GL`, 90, 50, {
    align: "left",
  });
  doc.text(`Atn: ${receta.getReceta.atenuacionEstimada} %`, 90, 55, {
    align: "left",
  });
  doc.text(`Carb: ${receta.getReceta.carbonatacionObjetivo} Vol`, 130, 50, {
    align: "left",
  });
  doc.text(`Emp: ${receta.getReceta.empaste}:1`, 130, 55, {
    align: "left",
  });
  doc.text(`Agua: ${receta.getReceta.agua} L`, 170, 50, {
    align: "left",
  });

  //Agregar funcion para obtener colores RGB de SRM
  if (receta.getReceta.srmEstimado === "1") {
    doc.setFillColor(251, 232, 153);
    doc.rect(170, 52, 30, 5, "F");
  } else if (receta.getReceta.srmEstimado === "2") {
    doc.setFillColor(255, 217, 120);
    doc.rect(170, 52, 30, 5, "F");
  } else if (receta.getReceta.srmEstimado === "3") {
    doc.setFillColor(248, 196, 87);
    doc.rect(170, 52, 30, 5, "F");
  } else if (receta.getReceta.srmEstimado === "4") {
    doc.setFillColor(246, 192, 57);
    doc.rect(170, 52, 30, 5, "F");
  } else if (receta.getReceta.srmEstimado === "5") {
    doc.setFillColor(250, 181, 42);
    doc.rect(170, 52, 30, 5, "F");
  } else if (receta.getReceta.srmEstimado === "6") {
    doc.setFillColor(242, 170, 0);
    doc.rect(170, 52, 30, 5, "F");
  } else if (receta.getReceta.srmEstimado === "7") {
    doc.setFillColor(238, 159, 0);
    doc.rect(170, 52, 30, 5, "F");
  } else if (receta.getReceta.srmEstimado === "8") {
    doc.setFillColor(233, 144, 2);
    doc.rect(170, 52, 30, 5, "F");
  } else if (receta.getReceta.srmEstimado === "9") {
    doc.setFillColor(225, 138, 0);
    doc.rect(170, 52, 30, 5, "F");
  } else if (receta.getReceta.srmEstimado === "10") {
    doc.setFillColor(215, 123, 0);
    doc.rect(170, 52, 30, 5, "F");
  } else if (receta.getReceta.srmEstimado === "11") {
    doc.setFillColor(205, 120, 1);
    doc.rect(170, 52, 30, 5, "F");
  } else if (receta.getReceta.srmEstimado === "12") {
    doc.setFillColor(201, 110, 3);
    doc.rect(170, 52, 30, 5, "F");
  } else if (receta.getReceta.srmEstimado === "13") {
    doc.setFillColor(195, 101, 3);
    doc.rect(170, 52, 30, 5, "F");
  } else if (receta.getReceta.srmEstimado === "14") {
    doc.setFillColor(188, 93, 0);
    doc.rect(170, 52, 30, 5, "F");
  } else if (receta.getReceta.srmEstimado === "15") {
    doc.setFillColor(177, 85, 2);
    doc.rect(170, 52, 30, 5, "F");
  } else if (receta.getReceta.srmEstimado === "16") {
    doc.setFillColor(179, 78, 0);
    doc.rect(170, 52, 30, 5, "F");
  } else if (receta.getReceta.srmEstimado === "17") {
    doc.setFillColor(170, 72, 1);
    doc.rect(170, 52, 30, 5, "F");
  } else if (receta.getReceta.srmEstimado === "18") {
    doc.setFillColor(158, 63, 0);
    doc.rect(170, 52, 30, 5, "F");
  } else if (receta.getReceta.srmEstimado === "19") {
    doc.setFillColor(156, 57, 0);
    doc.rect(170, 52, 30, 5, "F");
  } else if (receta.getReceta.srmEstimado === "20") {
    doc.setFillColorX(146, 55, 2);
    doc.rect(170, 52, 30, 5, "F");
  } else if (receta.getReceta.srmEstimado === "21") {
    doc.setFillColor(147, 47, 0);
    doc.rect(170, 52, 30, 5, "F");
  } else if (receta.getReceta.srmEstimado === "22") {
    doc.setFillColor(141, 44, 2);
    doc.rect(170, 52, 30, 5, "F");
  } else if (receta.getReceta.srmEstimado === "23") {
    doc.setFillColor(134, 36, 0);
    doc.rect(170, 52, 30, 5, "F");
  } else if (receta.getReceta.srmEstimado === "24") {
    doc.setFillColor(125, 31, 5);
    doc.rect(170, 52, 30, 5, "F");
  } else if (receta.getReceta.srmEstimado === "25") {
    doc.setFillColor(119, 25, 0);
    doc.rect(170, 52, 30, 5, "F");
  } else if (receta.getReceta.srmEstimado === "26") {
    doc.setFillColor(113, 28, 0);
    doc.rect(170, 52, 30, 5, "F");
  } else if (receta.getReceta.srmEstimado === "27") {
    doc.setFillColor(113, 22, 1);
    doc.rect(170, 52, 30, 5, "F");
  } else if (receta.getReceta.srmEstimado === "28") {
    doc.setFillColor(103, 15, 3);
    doc.rect(170, 52, 30, 5, "F");
  } else if (receta.getReceta.srmEstimado === "29") {
    doc.setFillColor(97, 14, 6);
    doc.rect(170, 52, 30, 5, "F");
  } else if (receta.getReceta.srmEstimado === "30") {
    doc.setFillColor(94, 12, 0);
    doc.rect(170, 52, 30, 5, "F");
  } else if (receta.getReceta.srmEstimado === "31") {
    doc.setFillColor(86, 13, 4);
    doc.rect(170, 52, 30, 5, "F");
  } else if (receta.getReceta.srmEstimado === "32") {
    doc.setFillColor(93, 10, 2);
    doc.rect(170, 52, 30, 5, "F");
  } else if (receta.getReceta.srmEstimado === "33") {
    doc.setFillColor(80, 10, 10);
    doc.rect(170, 52, 30, 5, "F");
  } else if (receta.getReceta.srmEstimado === "34") {
    doc.setFillColor(74, 6, 7);
    doc.rect(170, 52, 30, 5, "F");
  } else if (receta.getReceta.srmEstimado === "35") {
    doc.setFillColor(66, 8, 6);
    doc.rect(170, 52, 30, 5, "F");
  } else if (receta.getReceta.srmEstimado === "36") {
    doc.setFillColor(67, 7, 7);
    doc.rect(170, 52, 30, 5, "F");
  } else if (receta.getReceta.srmEstimado === "37") {
    doc.setFillColor(59, 8, 7);
    doc.rect(170, 52, 30, 5, "F");
  } else if (receta.getReceta.srmEstimado === "38") {
    doc.setFillColor(57, 7, 8);
    doc.rect(170, 52, 30, 5, "F");
  } else if (receta.getReceta.srmEstimado === "38") {
    doc.setFillColor(57, 8, 11);
    doc.rect(170, 52, 30, 5, "F");
  } else if (receta.getReceta.srmEstimado === "40") {
    doc.setFillColor(51, 9, 10);
    doc.rect(170, 52, 30, 5, "F");
  } else if (receta.getReceta.srmEstimado > "40") {
    doc.setFillColor(0, 0, 0);
    doc.rect(170, 52, 30, 5, "F");
  }

  doc.line(0, 60, 210, 60);

  //Fermentables
  doc.setFontSize(18);
  doc.text("Fermentables", 10, 67, {
    align: "left",
  });
  doc.setFontSize(12);
  let y = 75;
  receta.getReceta.fermentables.forEach((f) => {
    doc.text(`* ${f.nombre}: ${f.cantidad} Kg`, 10, y, {
      align: "left",
    });
    y += 5;
  });

  // Lúpulos
  doc.setFontSize(18);
  doc.text("Lúpulos", 105, 67, {
    align: "left",
  });
  doc.setFontSize(12);
  y = 75;
  receta.getReceta.lupulos.forEach((f) => {
    doc.text(
      `* ${f.nombre}: ${f.cantidad} g -> ${f.minsHervor} Mins hervor`,
      105,

      y,
      {
        align: "left",
      }
    );
    y += 5;
  });

  //Auxiliares
  y = 123;
  doc.setFontSize(18);
  doc.text("Auxiliares", 10, 115, {
    align: "left",
  });
  doc.setFontSize(12);
  receta.getReceta.auxiliares.forEach((f) => {
    doc.text(`* ${f.nombre}: ${f.cantidad} g ->${f.momentoAgregado}`, 10, y, {
      align: "left",
    });
    y += 5;
  });

  // Levadura
  doc.setFontSize(18);
  doc.text("Levadura", 105, 115, {
    align: "left",
  });
  doc.setFontSize(12);
  y = 123;
  receta.getReceta.levadura.forEach((f) => {
    doc.text(
      `* ${f.nombre}: ${f.cantidad} g `,
      105,

      y,
      {
        align: "left",
      }
    );
    y += 5;
  });

  // Notas de Estilo
  var nota = "";
  doc.setFontSize(18);
  doc.text("Notas del Estilo", 105, 150, {
    align: "center",
  });
  nota = doc.splitTextToSize(estilo.getEstilo.notas, 270);
  doc.setFontSize(12);
  doc.text(nota, 10, 160, { align: "left" });

  //Notas de Elaboración
  doc.setFontSize(18);
  doc.text("Notas de Elaboración", 105, 200, {
    align: "center",
  });
  nota = doc.splitTextToSize(receta.getReceta.notas, 270);
  doc.setFontSize(12);
  doc.text(nota, 10, 210, { align: "left" });

  //Perfil de estilo
  doc.addPage("a4", "portrait");
  doc.setFontSize(18);
  doc.text("Perfil del Estilo", 105, 30, {
    align: "center",
  });
  nota = doc.splitTextToSize(estilo.getEstilo.perfil, 270);
  doc.setFontSize(12);
  doc.text(nota, 10, 40, { align: "left" });

  // Guardado y descarga
  doc.save(`Receta ${receta.getReceta.nombre} by Arcanum.pdf`);
}

export { getRecetaPDF };
