export default function() {
  return [
    {
      title: "时间",
      align: "center",
      key: "date",
      minWidth: 90
    },
    {
      title: "iOS(占比)",
      align: "center",
      minWidth: 90,
      render(h, { row }) {
        return <span>{`${row.ios}(${row["ios-rate"]})`}</span>;
      }
    },
    {
      title: "Android(占比)",
      align: "center",
      minWidth: 90,
      render(h, { row }) {
        return <span>{`${row.andr}(${row["andr-rate"]})`}</span>;
      }
    },
    {
      title: "web(占比)",
      align: "center",
      minWidth: 90,
      render(h, { row }) {
        return <span>{`${row.web}(${row["web-rate"]})`}</span>;
      }
    },
    {
      title: "后台添加(占比)",
      align: "center",
      minWidth: 90,
      render(h, { row }) {
        return <span>{`${row.admin}(${row["admin-rate"]})`}</span>;
      }
    },
    {
      title: "总计",
      align: "center",
      key: "total",
      minWidth: 90
    }
  ];
}
