"use client";
import React, { useCallback, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { useCountries } from "../lib/getCountries";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { debounce } from "@/lib/utils";

interface Country {
  value: string;
  label: string;
  flag: string;
  latLang: [number, number];
  region: string;
}

type SelectCountriesProps = {
  setLocationValue: (value: string) => void;
};

export function SelectCountries({ setLocationValue }: SelectCountriesProps) {
  const { getAllCountries } = useCountries();
  const [searchValue, setSearchValue] = useState("");
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(false);

  // Debounce function để trì hoãn xử lý tìm kiếm
  const handleSearchChange = useCallback(
    debounce((value: string) => {
      setLoading(true);
      const filtered = getAllCountries().filter((country) =>
        country.label.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredCountries(filtered);
      setLoading(false);
    }, 500),
    []
  );

  useEffect(() => {
    setLoading(true);
    handleSearchChange(searchValue);
  }, [searchValue, handleSearchChange]);

  useEffect(() => {
    setLoading(true);
    const initialCountries = getAllCountries();
    setFilteredCountries(initialCountries);
    setLoading(false);
  }, []);

  return (
    <Select required onValueChange={(value) => setLocationValue(value)}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a Country" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Countries</SelectLabel>
          <div className="p-2">
            <Input
              type="text"
              placeholder="Search for a country"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="w-full p-2 border"
            />
          </div>
          <div className="max-h-48 overflow-y-auto">
            {loading ? (
              <div className="flex items-center justify-center p-4">
                <div
                  className="inline-block h-8 w-8 animate-spin rounded-full border-2 border-solid border-current border-e-transparent align-[-0.125em] text-primary motion-reduce:animate-[spin_1.5s_linear_infinite]"
                  role="status"
                >
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            ) : filteredCountries.length === 0 ? (
              <div className="p-4 text-center">No countries found.</div>
            ) : (
              filteredCountries.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.flag} {item.label} / {item.region}
                </SelectItem>
              ))
            )}
          </div>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
