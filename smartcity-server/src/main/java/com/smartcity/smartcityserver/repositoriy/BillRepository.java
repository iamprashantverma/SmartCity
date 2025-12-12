package com.smartcity.smartcityserver.repositoriy;

import com.smartcity.smartcityserver.entity.Bill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BillRepository extends JpaRepository<Bill,Long> {
    List<Bill> findAllByUserId(Long userId);
}
