package com.smartcity.smartcityserver.service;

import com.smartcity.smartcityserver.dto.BillDTO;
import com.smartcity.smartcityserver.exception.BillNotFoundException;

import java.util.List;


public interface BillService {

    /**
     * Creates a new bill in the system.
     *
     * @param billDTO the bill data transfer object containing bill details
     * @return the created bill as a BillDTO
     */
    BillDTO createBill(BillDTO billDTO);

    /**
     * Updates an existing bill identified by its ID.
     *
     * @param billId  the ID of the bill to update
     * @param billDTO the bill data transfer object containing updated details
     * @return the updated bill as a BillDTO
     * @throws com.smartcity.smartcityserver.exception.BillNotFoundException if the bill with given ID does not exist
     */
    BillDTO updateBill(Long billId, BillDTO billDTO);

    /**
     * Retrieves all bills in the system.
     * Admin users can access all bills, while consumers may have restricted access.
     *
     * @return a list of BillDTO objects representing all bills
     */
    List<BillDTO> getAllBills();

    /**
     * Retrieves a bill by its ID.
     *
     * @param billId the ID of the bill to retrieve
     * @return the corresponding BillDTO
     * @throws BillNotFoundException if the bill with given ID does not exist
     */
    BillDTO getBillById(Long billId);

    /**
     * Marks a bill as paid and sets the paid timestamp.
     *
     * @param billId the ID of the bill to mark as paid
     * @throws BillNotFoundException if the bill with given ID does not exist
     */
    void markBillAsPaid(Long billId);

}
