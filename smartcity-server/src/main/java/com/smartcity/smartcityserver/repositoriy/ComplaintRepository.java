package com.smartcity.smartcityserver.repositoriy;

import com.smartcity.smartcityserver.entity.Complaint;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ComplaintRepository extends JpaRepository<Complaint, Long> {


}
