import React, { useEffect, useState } from "react";
import { getPenduduk } from "../services/PendudukRequest";

const CetakPenduduk = () => {
  const [penduduk, setPenduduk] = useState([]);
  useEffect(() => {
    const loadData = async () => {
      const data = await getPenduduk("");
      setPenduduk(data.data);
    };
    loadData();
    setTimeout(() => {
        window.print();
    }, 1000);
  }, []);

  return (
    <>
      <div className="cetak-penduduk">
      <h2>INFORMASI DATA PENDUDUK</h2>
      <table className="table">
        <thead>
          <tr>
            <th>NIK</th>
            <th>Nama</th>
            <th>Tempat/Tanggal Lahir</th>
            <th>Gender</th>
            <th>Alamat</th>
            <th>Agama</th>
            <th>Pendidikan</th>
            <th>Pendidikan</th>
            <th>Kewarganegaraan</th>
            <th>Golongan Darah</th>
          </tr>
        </thead>
        <tbody>
          {penduduk.map((val) => (
            <tr>
              <td>{val.NIK}</td>
              <td>{val.nama}</td>
              <td>{val.ttl}</td>
              <td>{val.jk == 'L' ? 'Laki - Laki' : 'Perempuan'}</td>
              <td>{val.alamat}</td>
              <td>{val.agama}</td>
              <td>{val.pendidikan}</td>
              <td>{val.pekerjaan}</td>
              <td>{val.kewarganegaraan}</td>
              <td>{val.golongan_darah}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
};

export default CetakPenduduk;
