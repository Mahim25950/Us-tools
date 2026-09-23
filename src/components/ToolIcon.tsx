import React from 'react';
import {
  Wallet,
  ReceiptText,
  Home,
  Building2,
  Coins,
  Landmark,
  Clock,
  Ruler,
  Package,
  Cake,
  Calendar,
  FileText,
  Wrench,
  Utensils,
  DollarSign,
  Calculator,
  HeartPulse,
  GraduationCap,
  ShieldCheck,
  Briefcase,
  ArrowLeftRight,
  LayoutGrid,
  FileSpreadsheet,
  KeyRound,
  Percent,
} from 'lucide-react';

interface ToolIconProps {
  name: string;
  className?: string;
}

export function ToolIcon({ name, className = 'w-5 h-5' }: ToolIconProps) {
  switch (name) {
    case 'Utensils':
      return <Utensils className={className} />;
    case 'DollarSign':
      return <DollarSign className={className} />;
    case 'Calculator':
      return <Calculator className={className} />;
    case 'HeartPulse':
      return <HeartPulse className={className} />;
    case 'GraduationCap':
      return <GraduationCap className={className} />;
    case 'ShieldCheck':
      return <ShieldCheck className={className} />;
    case 'Briefcase':
      return <Briefcase className={className} />;
    case 'ArrowLeftRight':
      return <ArrowLeftRight className={className} />;
    case 'LayoutGrid':
      return <LayoutGrid className={className} />;
    case 'KeyRound':
      return <KeyRound className={className} />;
    case 'Percent':
      return <Percent className={className} />;
    case 'Wallet':
      return <Wallet className={className} />;
    case 'ReceiptText':
      return <ReceiptText className={className} />;
    case 'Home':
      return <Home className={className} />;
    case 'Building2':
      return <Building2 className={className} />;
    case 'Coins':
      return <Coins className={className} />;
    case 'Landmark':
      return <Landmark className={className} />;
    case 'Clock':
      return <Clock className={className} />;
    case 'Ruler':
      return <Ruler className={className} />;
    case 'Package':
      return <Package className={className} />;
    case 'Cake':
      return <Cake className={className} />;
    case 'Calendar':
      return <Calendar className={className} />;
    case 'FileText':
      return <FileText className={className} />;
    default:
      return <Wrench className={className} />;
  }
}

