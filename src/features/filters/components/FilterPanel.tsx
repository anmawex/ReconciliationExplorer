import { useTranslation } from 'react-i18next';
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
	const { t } = useTranslation();

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

	const getSourceLabel = (source: TransactionSource | "all") => {
		if (source === "all") return t('filters.allSources');
		if (source === "Bank") return t('sources.bank');
		if (source === "Payment Provider") return t('sources.paymentProvider');
		if (source === "ERP") return t('sources.erp');
		return source;
	};

	const getStatusLabel = (status: TransactionStatus | "all") => {
		if (status === "all") return t('filters.allStatuses');
		return t(`status.${status}`);
	};

	return (
		<div className="border-b border-border bg-card px-6 py-4">
			<div className="flex flex-wrap items-end gap-4">
				<div className="space-y-1.5">
					<Label
						htmlFor="source"
						className="text-xs font-medium text-muted-foreground">
						{t('filters.dataSource')}
					</Label>
					<Select value={filters.source} onValueChange={handleSourceChange}>
						<SelectTrigger id="source" className="w-[180px]">
							<SelectValue placeholder={t('filters.allSources')} />
						</SelectTrigger>
						<SelectContent>
							{sources.map((source) => (
								<SelectItem key={source} value={source}>
									{getSourceLabel(source)}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>

				<div className="space-y-1.5">
					<Label
						htmlFor="status"
						className="text-xs font-medium text-muted-foreground">
						{t('filters.status')}
					</Label>
					<Select value={filters.status} onValueChange={handleStatusChange}>
						<SelectTrigger id="status" className="w-[160px]">
							<SelectValue placeholder={t('filters.allStatuses')} />
						</SelectTrigger>
						<SelectContent>
							{statuses.map((status) => (
								<SelectItem key={status} value={status} className="capitalize">
									{getStatusLabel(status)}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>

				<div className="space-y-1.5">
					<Label
						htmlFor="minAmount"
						className="text-xs font-medium text-muted-foreground">
						{t('filters.minAmount')}
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
						{t('filters.maxAmount')}
					</Label>
					<Input
						id="maxAmount"
						type="number"
						placeholder={t('filters.noLimit')}
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
						{t('filters.clear')}
					</Button>
				)}

				<div className="ml-auto text-sm text-muted-foreground">
					{t('filters.showing')}{" "}
					<span className="font-medium text-foreground">
						{filteredCount.toLocaleString()}
					</span>{" "}
					{t('filters.of')}{" "}
					<span className="font-medium text-foreground">
						{totalCount.toLocaleString()}
					</span>{" "}
					{t('filters.transactions')}
				</div>
			</div>
		</div>
	);
}
