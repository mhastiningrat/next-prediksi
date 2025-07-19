"use client";

import { AppSidebar } from "@/components/app-sidebar"
// import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { DataTable } from "@/components/data-table"
import { SectionCards } from "@/components/section-cards"
import { SiteHeader } from "@/components/site-header"
import TableSkeleton from "@/components/table-skeleton";
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

// import datas from "./data.json"
import { redirect } from "next/navigation"
import { useEffect, useState } from "react"

type prediksiResponse = {
  id:number;
  cust_no:string;
  total_cair: number;
  rata_rata_penggunaan: number;
  rasio_telat:number;
  total_transaksi: number;
  plafon_sekarang:number;
  rekomendasi:string;
  plafon_rekomendasi:number;
  tanggal_trans_terakhir:string;
};

type dataCardResponse = {
  total_platform : number;
  total_pengguna : number;
  total_naik : number;
  total_rekomendasi: number;
};

export default function Page() {
  useEffect(()=>{
    if(!localStorage.getItem('on')) redirect('/');
  },[])

  const [data, setData] = useState<prediksiResponse[]>([]);
  const [dataCard, setDataCard] = useState<dataCardResponse[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(process.env.NEXT_PUBLIC_API_URL + 'rekomendasi-plafon');
      const result = await res.json();
      console.log(result)
      setData(result);

      let total_platform = 0;
      const total_pengguna = result.length;
      const total_naik = result.filter((i:prediksiResponse) => i.rekomendasi.includes("naik")).length;
      let total_rekomendasi = 0;

      //"id":1,"cust_no":"C100001895","rata_rata_penggunaan":1.41,"maks_penggunaan":3.95,"total_transaksi":36,"total_telat":14,"rasio_telat":0.39,"total_cair":45236193,"plafon_sekarang":2000000,"rekomendasi":"Tetap","plafon_rekomendasi":2000000

      for(const i of result as prediksiResponse[]){
        total_platform += i.total_cair;
        total_rekomendasi += i.plafon_rekomendasi
      }

      setDataCard([{
        total_platform,
        total_pengguna,
        total_naik,
        total_rekomendasi
      }])

      setIsLoading(false);
    } catch (error) {
      console.log((error as Error).message)
    }

  };

  useEffect(()=>{
  fetchData()
  console.log(data)
  },[])
  
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <SectionCards loading={isLoading} data={dataCard}/>
              <div className="px-4 lg:px-6">
                {/* <ChartAreaInteractive /> */}
              </div> 
              {isLoading ? <TableSkeleton/> : <DataTable data={data} />} 
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
