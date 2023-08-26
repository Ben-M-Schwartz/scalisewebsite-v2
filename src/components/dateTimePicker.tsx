"use client";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "../utils/shadcn";
import { Button } from "../components/shadcn/ui/button";
import { Calendar } from "../components/shadcn/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/shadcn/ui/popover";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/shadcn/ui/select";

export function DateTimePicker({
  date,
  time,
  am,
  setDate,
  setTime,
  setAm,
}: {
  date: Date | undefined;
  time: string;
  am: string;
  setDate: (date: Date | undefined) => void;
  setTime: (time: string) => void;
  setAm: (am: string) => void;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? (
            `${format(date, "PPP")} at ${time} ${am}`
          ) : (
            <span>Pick a date</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex w-auto flex-col space-y-2 p-2">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border"
        />
        <section className="flex gap-2">
          <Select onValueChange={setTime} value={time}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder={`${time}`} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="1:00">1:00</SelectItem>
                <SelectItem value="2:00">2:00</SelectItem>
                <SelectItem value="3:00">3:00</SelectItem>
                <SelectItem value="4:00">4:00</SelectItem>
                <SelectItem value="5:00">5:00</SelectItem>
                <SelectItem value="6:00">6:00</SelectItem>
                <SelectItem value="7:00">7:00</SelectItem>
                <SelectItem value="8:00">8:00</SelectItem>
                <SelectItem value="9:00">8:00</SelectItem>
                <SelectItem value="10:00">10:00</SelectItem>
                <SelectItem value="11:00">11:00</SelectItem>
                <SelectItem value="12:00">12:00</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select onValueChange={setAm} value={am}>
            <SelectTrigger className="w-[80px]">
              <SelectValue placeholder={`${am}`} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="AM">AM</SelectItem>
                <SelectItem value="PM">PM</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </section>
      </PopoverContent>
    </Popover>
  );
}
