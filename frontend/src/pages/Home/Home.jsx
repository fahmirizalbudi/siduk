import { useState, useEffect, useRef } from "react";
import Field from "../../components/Field/Field";
import OverviewCard from "../../components/OverviewCard/OverviewCard";
import PageHeader from "../../components/PageHeader/PageHeader";
import Layout from "../../layouts/Layout";
import "./Home.css";
import { useOutletContext } from "react-router-dom";
import { ChartCard } from "../../components/Charts/ChartCard";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  FunnelChart,
  Funnel,
  LabelList,
} from "recharts";
import { RenderLegend } from "../../components/Charts/RenderLegend";
import { getHome } from "../../services/HomeRequest";

export default function Home() {
  const [section, setSection] = useState("General");
  const { user } = useOutletContext();
  const [refresh, setRefresh] = useState(false);
  const [dataKelahiranKematian, setDataKelahiranKematian] = useState([]);
  const [dataPendatangPindah, setDataPendatangPindah] = useState([]);
  const [dataCount, setDataCount] = useState([]);
  const [dataGender, setDataGender] = useState([]);
  const [dataUmur, setDataUmur] = useState([]);
  const chartRef = useRef(null);
  const [bulan, setBulan] = useState("Bulan");

  useEffect(() => {
    document.title = "Home";
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setBulan(chartRef.current?.offsetWidth < 800 ? "Index" : "Bulan");
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [section]);

  const loadData = async () => {
    const res = await getHome();
    const kelahiranKematian = res?.data.kelahiran_kematian.map((val, idx) => ({
      Index: (idx += 1),
      Bulan: val.nama_bulan,
      Kelahiran: val.jumlah_kelahiran,
      Kematian: val.jumlah_kematian,
    }));
    const pendatangPindah = res?.data.pendatang_pindah.map((val, idx) => ({
      Index: (idx += 1),
      Bulan: val.nama_bulan,
      Pendatang: val.jumlah_pendatang,
      Pindah: val.jumlah_pindah,
    }));
    const gender = res?.data.data_gender.map((val, idx) => ({
      name: val.gender,
      value: val.jumlah,
      color: val.gender === "Laki - Laki" ? "#1E90FF" : "rgb(215, 215, 215)",
    }));
    const umur = res?.data.data_umur.map((val, idx) => ({
      rentang: val.Rentang,
      jumlah: val.Jumlah
    }))
    setDataKelahiranKematian(kelahiranKematian);
    setDataPendatangPindah(pendatangPindah);
    setDataCount(res?.data.count);
    setDataGender(gender);
    setDataUmur(umur);
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setRefresh((prev) => !prev);
    }, 800);
  }, [section]);

  return (
    <Layout>
      <PageHeader
        hasGroup={false}
        breadcrumbsLink={`Main`}
        breadcrumbsPath={`Home`}
        heading={`Home`}
      >
        <div className="filter">
          <select
            className="filter-select"
            onChange={(e) => setSection(e.target.value)}
          >
            <option value="General">General</option>
            <option value="Overview">Overview</option>
            <option value="Statistics">Statistics</option>
          </select>
        </div>
      </PageHeader>
      <Layout.Main>
        <div className="home-container">
          {section === "General" && (
            <div className="general">
              <div className="UserCard">
                <div className="wrapper">
                  <div className="container">
                    <div className="user-card-profile">
                      <img
                        className="user-card-avatar"
                        src={window?.avatarURL}
                      />
                      <div className="user-card-info">
                        <h2>Welcome</h2>
                        <p>{user?.username}</p>
                      </div>
                    </div>
                    <div className="user-card-logout">
                      <a href="/logout" className="button secondary">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={19}
                          height={19}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="icon icon-tabler icons-tabler-outline icon-tabler-yoga"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <path d="M12 4m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
                          <path d="M4 20h4l1.5 -3" />
                          <path d="M17 20l-1 -5h-5l1 -7" />
                          <path d="M4 10l4 -1l4 -1l4 1.5l4 1.5" />
                        </svg>
                        <span>Sign Out</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {section === "Overview" && (
            <div className="overview">
              <OverviewCard label="Penduduk" value={dataCount.penduduk || "0"}>
                <OverviewCard.Icon bgColor={`#D2F6EA`}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={36}
                    height={36}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#42B693"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="icon icon-tabler icons-tabler-outline icon-tabler-user"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
                    <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                  </svg>
                </OverviewCard.Icon>
              </OverviewCard>
              <OverviewCard label="Keluarga" value={dataCount.keluarga || "0"}>
                <OverviewCard.Icon bgColor={`#E0EBFE`}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={36}
                    height={36}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#456BE2"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="icon icon-tabler icons-tabler-outline icon-tabler-users"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M9 7m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
                    <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    <path d="M21 21v-2a4 4 0 0 0 -3 -3.85" />
                  </svg>
                </OverviewCard.Icon>
              </OverviewCard>
              <OverviewCard
                label="Kelahiran"
                value={dataCount.kelahiran || "0"}
              >
                <OverviewCard.Icon bgColor={`#EFEFEF`}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={36}
                    height={36}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#2D2D2D"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="icon icon-tabler icons-tabler-outline icon-tabler-baby-carriage"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M8 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                    <path d="M18 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                    <path d="M2 5h2.5l1.632 4.897a6 6 0 0 0 5.693 4.103h2.675a5.5 5.5 0 0 0 0 -11h-.5v6" />
                    <path d="M6 9h14" />
                    <path d="M9 17l1 -3" />
                    <path d="M16 14l1 3" />
                  </svg>
                </OverviewCard.Icon>
              </OverviewCard>
              <OverviewCard label="Kematian" value={dataCount.kematian || "0"}>
                <OverviewCard.Icon bgColor={`#FBEFEE`}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={36}
                    height={36}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#C0595D"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="icon icon-tabler icons-tabler-outline icon-tabler-rectangle-rounded-top"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M9 6h6a6 6 0 0 1 6 6v5a1 1 0 0 1 -1 1h-16a1 1 0 0 1 -1 -1v-5a6 6 0 0 1 6 -6z" />
                  </svg>
                </OverviewCard.Icon>
              </OverviewCard>
              <OverviewCard
                label="Pendatang"
                value={dataCount.pendatang || "0"}
              >
                <OverviewCard.Icon bgColor={`rgba(217,131,36,0.1)`}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={36}
                    height={36}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="rgb(217,131,36)"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="icon icon-tabler icons-tabler-outline icon-tabler-logout"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
                    <path d="M9 12h12l-3 -3" />
                    <path d="M18 15l3 -3" />
                  </svg>
                </OverviewCard.Icon>
              </OverviewCard>
              <OverviewCard label="Pindah" value={dataCount.pindah || "0"}>
                <OverviewCard.Icon bgColor={`rgba(0,135,198,0.1)`}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={36}
                    height={36}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="rgb(0,135,198)"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="icon icon-tabler icons-tabler-outline icon-tabler-logout-2"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M10 8v-2a2 2 0 0 1 2 -2h7a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-7a2 2 0 0 1 -2 -2v-2" />
                    <path d="M15 12h-12l3 -3" />
                    <path d="M6 15l-3 -3" />
                  </svg>
                </OverviewCard.Icon>
              </OverviewCard>
              <OverviewCard label="Provinsi" value={dataCount.provinsi || "0"}>
                <OverviewCard.Icon bgColor={`rgba(255,217,95,0.1)`}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={34}
                    height={34}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="rgb(255,217,95)"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="icon icon-tabler icons-tabler-outline icon-tabler-location"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M21 3l-6.5 18a.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5" />
                  </svg>
                </OverviewCard.Icon>
              </OverviewCard>
              <OverviewCard
                label="Kota & Kabupaten"
                value={dataCount.kota_kabupaten || "0"}
              >
                <OverviewCard.Icon bgColor={`rgba(39,68,93,0.1)`}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={36}
                    height={36}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="rgb(39,68,93)"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="icon icon-tabler icons-tabler-outline icon-tabler-building-monument"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M8 18l2 -13l2 -2l2 2l2 13" />
                    <path d="M5 21v-3h14v3" />
                    <path d="M3 21l18 0" />
                  </svg>
                </OverviewCard.Icon>
              </OverviewCard>
              <OverviewCard
                label="Kecamatan"
                value={dataCount.kecamatan || "0"}
              >
                <OverviewCard.Icon bgColor={`rgba(120,12,40,0.1)`}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={36}
                    height={36}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="rgb(120,12,40)"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="icon icon-tabler icons-tabler-outline icon-tabler-building-skyscraper"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M3 21l18 0" />
                    <path d="M5 21v-14l8 -4v18" />
                    <path d="M19 21v-10l-6 -4" />
                    <path d="M9 9l0 .01" />
                    <path d="M9 12l0 .01" />
                    <path d="M9 15l0 .01" />
                    <path d="M9 18l0 .01" />
                  </svg>
                </OverviewCard.Icon>
              </OverviewCard>
              <OverviewCard
                label="Desa & Kelurahan"
                value={dataCount.desa_kelurahan || "0"}
              >
                <OverviewCard.Icon bgColor={`rgba(75,22,76,0.1)`}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={36}
                    height={36}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="rgba(75,22,76)"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="icon icon-tabler icons-tabler-outline icon-tabler-window"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M12 3c-3.866 0 -7 3.272 -7 7v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1 -1v-10c0 -3.728 -3.134 -7 -7 -7z" />
                    <path d="M5 13l14 0" />
                    <path d="M12 3l0 18" />
                  </svg>
                </OverviewCard.Icon>
              </OverviewCard>
              <OverviewCard label="RW" value={dataCount.rw || "0"}>
                <OverviewCard.Icon bgColor={`rgba(152,216,239,0.2)`}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={36}
                    height={36}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="rgb(152,216,239)"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="icon icon-tabler icons-tabler-outline icon-tabler-square-letter-w"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M3 3m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z" />
                    <path d="M9 8l1 8l2 -5l2 5l1 -8" />
                  </svg>
                </OverviewCard.Icon>
              </OverviewCard>
              <OverviewCard label="RT" value={dataCount.rt || "0"}>
                <OverviewCard.Icon bgColor={`rgba(124,115,125,0.1)`}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={36}
                    height={36}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="rgb(124,115,125)"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="icon icon-tabler icons-tabler-outline icon-tabler-square-letter-t"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M3 3m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z" />
                    <path d="M10 8h4" />
                    <path d="M12 8v8" />
                  </svg>
                </OverviewCard.Icon>
              </OverviewCard>
              <OverviewCard
                label="Pendidikan"
                value={dataCount.pendidikan || "0"}
              >
                <OverviewCard.Icon bgColor={`rgba(139,93,255,0.1)`}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={36}
                    height={36}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="rgb(139,93,255)"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="icon icon-tabler icons-tabler-outline icon-tabler-school"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M22 9l-10 -4l-10 4l10 4l10 -4v6" />
                    <path d="M6 10.6v5.4a6 3 0 0 0 12 0v-5.4" />
                  </svg>
                </OverviewCard.Icon>
              </OverviewCard>
              <OverviewCard
                label="Pekerjaan"
                value={dataCount.pekerjaan || "0"}
              >
                <OverviewCard.Icon bgColor={`rgba(26,77,46,0.1)`}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={36}
                    height={36}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="rgb(26,77,46)"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="icon icon-tabler icons-tabler-outline icon-tabler-briefcase-2"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M3 9a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-9z" />
                    <path d="M8 7v-2a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v2" />
                  </svg>
                </OverviewCard.Icon>
              </OverviewCard>
            </div>
          )}
          {section === "Statistics" && (
            <div className="statistics">
              <ChartCard title="Grafik Gender" wFull={false}>
                <ResponsiveContainer width="100%" height={400}>
                  <PieChart margin={{ top: 1, right: 1, left: 1, bottom: 5 }}>
                    <Pie
                      data={dataGender}
                      cx="50%"
                      cy="42.5%"
                      innerRadius={100}
                      outerRadius={140}
                      paddingAngle={8}
                      dataKey="value"
                      startAngle={90}
                      endAngle={450}
                    >
                      {dataGender.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={entry.color}
                          stroke="white"
                          strokeWidth={4}
                        />
                      ))}
                    </Pie>
                    <Legend
                      content={RenderLegend}
                      verticalAlign="bottom"
                      height={32.5}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </ChartCard>
              <ChartCard title="Grafik Umur" wFull={false}>
                <div style={{ paddingRight: 30, paddingLeft: 20 }}>
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart
                      data={dataUmur}
                      margin={{ top: 1, right: 1, left: 1, bottom: 5 }}
                      layout="vertical"
                    >
                      <YAxis
                        type="category"
                        dataKey="rentang"
                        axisLine={false}
                        tickLine={false}
                        tick={{
                          fill: "#64748b",
                          fontSize: 12,
                          fontFamily: '"Plus Jakarta Sans"',
                        }}
                      />
                      <XAxis
                        type="number"
                        axisLine={false}
                        tickLine={false}
                        allowDecimals={false}
                        tick={{
                          fill: "#64748b",
                          fontSize: 12,
                          fontFamily: '"Plus Jakarta Sans"',
                        }}
                      />
                      <Bar
                        dataKey="jumlah"
                        fill="#1e2939"
                        radius={[0, 3, 3, 0]}
                        maxBarSize={12}
                      />
                      <Legend
                      content={RenderLegend}
                      verticalAlign="bottom"
                      height={32.5}
                    />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </ChartCard>
              <ChartCard
                title="Grafik Kelahiran & Kematian 2025"
                chartRef={chartRef}
                wFull={true}
              >
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart
                    data={dataKelahiranKematian}
                    margin={{ top: 1, right: 1, left: 1, bottom: 5 }}
                  >
                    <XAxis
                      dataKey={bulan}
                      axisLine={false}
                      tickLine={false}
                      tick={{
                        fill: "#64748b",
                        fontSize: 12,
                        fontFamily: '"Plus Jakarta Sans"',
                      }}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      allowDecimals={false}
                      tick={{
                        fill: "#64748b",
                        fontSize: 12,
                        fontFamily: '"Plus Jakarta Sans"',
                      }}
                    />
                    <Legend
                      content={RenderLegend}
                      verticalAlign="bottom"
                      height={32.5}
                    />
                    <Bar
                      dataKey="Kelahiran"
                      fill="#a0c9c7"
                      radius={[6, 6, 0, 0]}
                      maxBarSize={35}
                    />
                    <Bar
                      dataKey="Kematian"
                      fill="#288d8d"
                      radius={[6, 6, 0, 0]}
                      maxBarSize={35}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </ChartCard>
              <ChartCard
                title="Grafik Pendatang & Pindah 2025"
                chartRef={chartRef}
                wFull={true}
              >
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart
                    data={dataPendatangPindah}
                    margin={{ top: 1, right: 1, left: 1, bottom: 5 }}
                  >
                    <XAxis
                      dataKey={bulan}
                      axisLine={false}
                      tickLine={false}
                      tick={{
                        fill: "#64748b",
                        fontSize: 12,
                        fontFamily: '"Plus Jakarta Sans"',
                      }}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      allowDecimals={false}
                      tick={{
                        fill: "#64748b",
                        fontSize: 12,
                        fontFamily: '"Plus Jakarta Sans"',
                      }}
                    />
                    <Legend
                      content={RenderLegend}
                      verticalAlign="bottom"
                      height={32.5}
                    />
                    <Bar
                      dataKey="Pendatang"
                      fill="#97a7c4"
                      radius={[6, 6, 0, 0]}
                      maxBarSize={35}
                    />
                    <Bar
                      dataKey="Pindah"
                      fill="#394760"
                      radius={[6, 6, 0, 0]}
                      maxBarSize={35}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </ChartCard>
            </div>
          )}
        </div>
      </Layout.Main>
    </Layout>
  );
}
