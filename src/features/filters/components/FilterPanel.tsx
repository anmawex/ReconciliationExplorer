import type {
	TransactionFilters,
	TransactionSource,
	TransactionStatus,
} from "@/features/transactions";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/shared/components/select";
import { Input } from "@/shared/components/input";
import { Label } from "@/shared/components/label";
import { Button } from "@/shared/components/button";
import { X } from "lucide-react";

interface FilterPanelProps {
	filters: TransactionFilters;
	onFiltersChange: (filters: TransactionFilters) => void;
	filteredCount: number;
	totalCount: number;
}

const sources: (TransactionSource | "all")[] = [
	"all",
	"Bank",
	"Payment Provider",
	"ERP",
];
const statuses: (TransactionStatus | "all")[] = [
	"all",
	"reconciled",
	"pending",
	"inconsistent",
];

export function FilterPanel({
	filters,
	onFiltersChange,
	filteredCount,
	totalCount,
}: FilterPanelProps) {
	const handleSourceChange = (value: string) => {
		onFiltersChange({
			...filters,
			source: value as TransactionSource | "all",
		});
	};

	const handleStatusChange = (value: string) => {
		onFiltersChange({
			...filters,
			status: value as TransactionStatus | "all",
		});
	};

	const handleMinAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value ? parseFloat(e.target.value) : null;
		onFiltersChange({
			...filters,
			minAmount: value,
		});
	};

	const handleMaxAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value ? parseFloat(e.target.value) : null;
		onFiltersChange({
			...filters,
			maxAmount: value,
		});
	};

	const clearFilters = () => {
		onFiltersChange({
			source: "all",
			status: "all",
			minAmount: null,
			maxAmount: null,
		});
	};

	const hasActiveFilters =
		filters.source !== "all" ||
		filters.status !== "all" ||
		filters.minAmount !== null ||
		filters.maxAmount !== null;

	return (
		<div className="border-b border-border bg-card px-6 py-4">
			<div className="flex flex-wrap items-end gap-4">
				<div className="space-y-1.5">
					<Label
						htmlFor="source"
						className="text-xs font-medium text-muted-foreground">
						Data Source
					</Label>
					<Select value={filters.source} onValueChange={handleSourceChange}>
						<SelectTrigger id="source" className="w-[180px]">
							<SelectValue placeholder="All Sources" />
						</SelectTrigger>
						<SelectContent>
							{sources.map((source) => (
								<SelectItem key={source} value={source}>
									{source === "all" ? "All Sources" : source}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>

				<div className="space-y-1.5">
					<Label
						htmlFor="status"
						className="text-xs font-medium text-muted-foreground">
						Status
					</Label>
					<Select value={filters.status} onValueChange={handleStatusChange}>
						<SelectTrigger id="status" className="w-[160px]">
							<SelectValue placeholder="All Statuses" />
						</SelectTrigger>
						<SelectContent>
							{statuses.map((status) => (
								<SelectItem key={status} value={status} className="capitalize">
									{status === "all"
										? "All Statuses"
										: status.charAt(0).toUpperCase() + status.slice(1)}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>

				<div className="space-y-1.5">
					<Label
						htmlFor="minAmount"
						className="text-xs font-medium text-muted-foreground">
						Min Amount
					</Label>
					<Input
						id="minAmount"
						type="number"
						placeholder="0.00"
						className="w-[120px]"
						value={filters.minAmount ?? ""}
						onChange={handleMinAmountChange}
					/>
				</div>

				<div className="space-y-1.5">
					<Label
						htmlFor="maxAmount"
						className="text-xs font-medium text-muted-foreground">
						Max Amount
					</Label>
					<Input
						id="maxAmount"
						type="number"
						placeholder="No limit"
						className="w-[120px]"
						value={filters.maxAmount ?? ""}
						onChange={handleMaxAmountChange}
					/>
				</div>

				{hasActiveFilters && (
					<Button
						variant="ghost"
						size="sm"
						onClick={clearFilters}
						className="h-9">
						<X className="mr-1 h-4 w-4" />
						Clear
					</Button>
				)}

				<div className="ml-auto text-sm text-muted-foreground">
					Showing{" "}
					<span className="font-medium text-foreground">
						{filteredCount.toLocaleString()}
					</span>{" "}
					of{" "}
					<span className="font-medium text-foreground">
						{totalCount.toLocaleString()}
					</span>{" "}
					transactions
				</div>
			</div>
		</div>
	);
}
