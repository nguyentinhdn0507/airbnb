"use client";

import { createLocation } from "@/app/actions";
import { CreationBottomBar } from "@/app/components/CreationBottomBar";
import { SelectCountries } from "@/app/components/SelectCountries";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import dynamic from "next/dynamic";
import { useState } from "react";

export default function AddressRoute({ params }: { params: { id: string } }) {
  const LazyMap = dynamic(() => import("@/app/components/Map"), {
    ssr: false,
    loading: () => <Skeleton className="h-[50vh] w-full" />,
  });
  const [locationValue, setLocationValue] = useState("");
  return (
    <>
      <div className="w-3/5 mx-auto">
        <h2 className="text-3xl font-semibold tracking-tight transition-colors mb-10">
          Where is your Home located?
        </h2>
      </div>

      <form action={createLocation}>
        <input type="hidden" name="homeId" value={params.id} />
        <input type="hidden" name="countryValue" value={locationValue} />
        <div className="w-3/5 mx-auto mb-36">
          <div className="mb-5">
            <SelectCountries setLocationValue={setLocationValue} />
          </div>
          <LazyMap locationValue={locationValue} />
        </div>

        <CreationBottomBar />
      </form>
    </>
  );
}
