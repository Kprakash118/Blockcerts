// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CertificateIssuanceSystem {
    // Struct to store certificate details
    struct Certificate {
        address recipient;
        string courseName;
        uint256 issuanceDate;
        uint256 certificateId;
        bool isValid;
    }

    // State variables
    address public owner;
    uint256 private nextCertificateId;
    
    // Mappings
    mapping(address => bool) public isIssuers;
    mapping(uint256 => Certificate) public certificates;
    mapping(address => mapping(string => bool)) private recipientCourseCertificates;

    // Events
    event IssuerAdded(address indexed issuer);
    event IssuerRemoved(address indexed issuer);
    event CertificateIssued(
        address indexed recipient, 
        string courseName, 
        uint256 certificateId
    );
    event CertificateRevoked(
        address indexed recipient, 
        string courseName, 
        uint256 certificateId
    );

    // Modifiers
    modifier onlyOwner() {
        require(msg.sender == owner, "Only contract owner can perform this action");
        _;
    }

    modifier onlyIssuer() {
        require(isIssuers[msg.sender], "Only authorized issuers can perform this action");
        _;
    }

    // Constructor
    constructor() {
        owner = msg.sender;
        isIssuers[msg.sender] = true;
        nextCertificateId = 1;
    }

    // Function to add new issuers (only owner can add)
    function addIssuer(address _issuer) external onlyOwner {
        require(!isIssuers[_issuer], "Address is already an issuer");
        isIssuers[_issuer] = true;
        emit IssuerAdded(_issuer);
    }

    // Function to remove issuers (only owner can remove)
    function removeIssuer(address _issuer) external onlyOwner {
        require(isIssuers[_issuer], "Address is not an issuer");
        isIssuers[_issuer] = false;
        emit IssuerRemoved(_issuer);
    }

    // Function to issue a certificate
    function issueCertificate(
        address _recipient, 
        string memory _courseName
    ) external onlyIssuer returns (uint256) {
        // Prevent duplicate certificates for the same recipient and course
        require(
            !recipientCourseCertificates[_recipient][_courseName], 
            "Certificate for this course already exists for the recipient"
        );

        // Generate unique certificate ID
        uint256 certificateId = nextCertificateId++;

        // Create and store the certificate
        certificates[certificateId] = Certificate({
            recipient: _recipient,
            courseName: _courseName,
            issuanceDate: block.timestamp,
            certificateId: certificateId,
            isValid: true
        });

        // Mark course certificate as issued for this recipient
        recipientCourseCertificates[_recipient][_courseName] = true;

        // Emit event
        emit CertificateIssued(_recipient, _courseName, certificateId);

        return certificateId;
    }

    // Function to revoke a certificate
    function revokeCertificate(uint256 _certificateId) external onlyIssuer {
        Certificate storage cert = certificates[_certificateId];
        
        require(cert.isValid, "Certificate is already revoked");
        
        // Mark certificate as invalid
        cert.isValid = false;

        // Emit revocation event
        emit CertificateRevoked(
            cert.recipient, 
            cert.courseName, 
            _certificateId
        );
    }

    // Function to verify a certificate
    function verifyCertificate(
        uint256 _certificateId
    ) external view returns (
        bool exists, 
        bool isValid, 
        address recipient, 
        string memory courseName, 
        uint256 issuanceDate
    ) {
        Certificate memory cert = certificates[_certificateId];
        
        return (
            cert.recipient != address(0),
            cert.isValid,
            cert.recipient,
            cert.courseName,
            cert.issuanceDate
        );
    }
}
