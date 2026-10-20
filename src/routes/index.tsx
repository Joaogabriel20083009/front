import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from '../components/layout/MainLayout';
import { DashboardRH } from '../pages/rh/DashboardRH';
import { PortalLider } from '../pages/leader/PortalLider';
import { PainelInstrutor } from '../pages/instructor/PainelInstrutor';
import { Certificados } from '../pages/certificates/Certificados';
import { ValidacaoPublica } from '../pages/public-verify/ValidacaoPublica';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Navigate to="/rh" replace />} />
        <Route path="rh" element={<DashboardRH />} />
        <Route path="lider" element={<PortalLider />} />
        <Route path="instrutor" element={<PainelInstrutor />} />
        <Route path="certificados" element={<Certificados />} />
        <Route path="validar" element={<ValidacaoPublica />} />
        <Route path="*" element={<Navigate to="/rh" replace />} />
      </Route>
    </Routes>
  );
};
