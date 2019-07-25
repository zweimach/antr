import React from "react";

import MenuCard from "./MenuCard";

function HelpCenter() {
  const cardList = [
    {
      id: 0,
      name: "NPWP",
      items: [
        "Pendaftaran NPWP OP (Non Usahawan)",
        "Permohonan Perubahan Data NPWP",
        "Permohonan PKP",
        "Permohonan Penetapan NE",
        "Permohonan Penghapusan NPWP",
        "Cetak Ulang NPWP"
      ]
    },
    {
      id: 1,
      name: "Faktur & Surat Lain",
      items: [
        "Faktur Pajak",
        "Sertifikat Elektronik",
        "Surat Permohonan Lainnya"
      ]
    },
    {
      id: 2,
      name: "SPT",
      items: ["Pelaporan SPT Masa", "Pelaporan SPT Tahunan"]
    },
    {
      id: 3,
      name: "NPWP Usahawan",
      items: ["Pendaftaran NPWP OP Usahawan"]
    },
    {
      id: 4,
      name: "Informasi & Helpdesk",
      items: ["Informasi Perpajakan", "Konsultasi Perpajakan"]
    }
  ];

  return (
    <>
      {cardList.map(({ id, name, items }) => (
        <MenuCard key={id} items={items}>
          {name}
        </MenuCard>
      ))}
    </>
  );
}

export default HelpCenter;
