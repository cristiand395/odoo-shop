import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function LanguageSelector() {
  return (
    <Select defaultValue="a">
      <SelectTrigger className="min-w-24">
        <SelectValue placeholder="Español" className="min-w-24" />
      </SelectTrigger>
      <SelectContent align="end">
        <SelectGroup>
          <SelectItem value="a">Español</SelectItem>
          <SelectItem value="b">English</SelectItem>
          <SelectItem value="french">Francés</SelectItem>
          <SelectItem value="d">Portugués</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select >
  );
}