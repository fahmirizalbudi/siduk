import React from "react";
import "./CardProfile.css";

const CardProfile = ({ penduduk }) => {
  return (
    <div className="ktp-container">
      <div className="ktp-header">
        <h1>PROFIL PENDUDUK</h1>
      </div>
      <div className="ktp-content">
        <div className="ktp-data">
          <table>
            <tbody>
              <tr>
                <td className="label">Status</td>
                <td className="colon">:</td>
                <td className="value">{penduduk.status}</td>
              </tr>
              <tr>
                <td className="label">NIK</td>
                <td className="colon">:</td>
                <td className="value">{penduduk.NIK}</td>
              </tr>
              <tr>
                <td className="label">Nama</td>
                <td className="colon">:</td>
                <td className="value">{penduduk.nama}</td>
              </tr>
              <tr>
                <td className="label">Tempat/Tgl Lahir</td>
                <td className="colon">:</td>
                <td className="value">{penduduk.ttl}</td>
              </tr>
              <tr>
                <td className="label">Jenis Kelamin</td>
                <td className="colon">:</td>
                <td className="value">
                  {penduduk.jk === "L" ? "Laki - Laki" : "Perempuan"}
                </td>
              </tr>
              <tr>
                <td className="label">Alamat</td>
                <td className="colon">:</td>
                <td className="value">{penduduk.alamat}</td>
              </tr>
              <tr>
                <td className="label">Agama</td>
                <td className="colon">:</td>
                <td className="value">{penduduk.agama}</td>
              </tr>
              <tr>
                <td className="label">Pendidikan</td>
                <td className="colon">:</td>
                <td className="value">{penduduk.pendidikan}</td>
              </tr>
              <tr>
                <td className="label">Pekerjaan</td>
                <td className="colon">:</td>
                <td className="value">{penduduk.pekerjaan}</td>
              </tr>
              <tr>
                <td className="label">Gol. Darah</td>
                <td className="colon">:</td>
                <td className="value">{penduduk.golongan_darah}</td>
              </tr>
              <tr>
                <td className="label">Kewarganegaraan</td>
                <td className="colon">:</td>
                <td className="value">{penduduk.kewarganegaraan}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="ktp-photo-section">
          <img
            className="ktp-photo"
            src={`${
              penduduk.jk === "L"
                ? "https://demosid.opendesa.id/assets/images/pengguna/kuser.png"
                : "https://demosid.opendesa.id/assets/images/pengguna/wuser.png"
            }`}
          />
        </div>
      </div>
    </div>
  );
};

export default CardProfile;
