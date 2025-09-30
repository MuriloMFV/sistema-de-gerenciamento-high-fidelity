import { useState, useEffect } from "react";

export function useDB() {
  const [catalog, setCatalog] = useState([]);
  const [clients, setClients] = useState([]);
  const [sales, setSales] = useState([]);

  useEffect(() => {
    setCatalog(JSON.parse(localStorage.getItem("catalog")) || []);
    setClients(JSON.parse(localStorage.getItem("clients")) || []);
    setSales(JSON.parse(localStorage.getItem("sales")) || []);
  }, []);

  useEffect(() => {
    localStorage.setItem("catalog", JSON.stringify(catalog));
  }, [catalog]);

  useEffect(() => {
    localStorage.setItem("clients", JSON.stringify(clients));
  }, [clients]);

  useEffect(() => {
    localStorage.setItem("sales", JSON.stringify(sales));
  }, [sales]);

  return { catalog, setCatalog, clients, setClients, sales, setSales };
}
