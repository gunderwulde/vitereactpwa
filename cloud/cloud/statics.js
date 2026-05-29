Parse.Cloud.define("GetStaticData", (request) => {
  return {
    plantas: [
      {
        codigoPlanta: "P001",
        nombrePlanta: "Planta A",
        grupos: [
          {
            codigoGrupo: "G001",
            nombreGrupo: "Grupo 1",
            bombaModelo: "Bomba-X100",
            bombaNumeroSerie: "BX100-0001",
            motorModelo: "Motor-M50",
            motorCodigoSerie: "M50-1234",
            turbinaModelo: "Turbina-T9",
            turbinaNumeroSerie: "T9-4321"
          },
          {
            codigoGrupo: "G002",
            nombreGrupo: "Grupo 2",
            bombaModelo: "Bomba-Y200",
            bombaNumeroSerie: "BY200-0002",
            motorModelo: "Motor-M60",
            motorCodigoSerie: "M60-5678",
            turbinaModelo: "Turbina-T10",
            turbinaNumeroSerie: "T10-8765"
          }
        ]
      },
      {
        codigoPlanta: "P002",
        nombrePlanta: "Planta B",
        grupos: [
          {
            codigoGrupo: "G010",
            nombreGrupo: "Grupo A",
            bombaModelo: "Bomba-Z300",
            bombaNumeroSerie: "BZ300-0100",
            motorModelo: "Motor-M70",
            motorCodigoSerie: "M70-0007",
            turbinaModelo: "Turbina-T20",
            turbinaNumeroSerie: "T20-1000"
          }
        ]
      }
    ]
  }
});
